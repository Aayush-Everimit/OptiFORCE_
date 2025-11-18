package com.OptiFORCE.OptiFORCE.Service;

import com.OptiFORCE.OptiFORCE.Entity.Employee;
import com.OptiFORCE.OptiFORCE.Entity.TaskLog;
import com.OptiFORCE.OptiFORCE.Repository.AssignmentRepository;
import com.OptiFORCE.OptiFORCE.Repository.EmployeeRepository;
import com.OptiFORCE.OptiFORCE.Repository.TaskLogRepository; // Added dependency for processNewTaskLogs
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final AssignmentRepository assignmentRepository;
    private final TaskLogRepository taskLogRepository; // Added dependency

    public EmployeeService(
            EmployeeRepository employeeRepository,
            AssignmentRepository assignmentRepository,
            TaskLogRepository taskLogRepository) {

        this.employeeRepository = employeeRepository;
        this.assignmentRepository = assignmentRepository;
        this.taskLogRepository = taskLogRepository;
    }

    @Transactional
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public List<Employee> retrieveAllEmployees() {
        return employeeRepository.findAll();
    }

    public Employee retrieveEmployeeById(Long id) {
        return employeeRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found with ID: " + id));
    }

    public List<Employee> getAllEmployeesForOptimization() {
        return employeeRepository.findAll();
    }

    @Transactional
    public void processNewTaskLogs(List<TaskLog> taskLogs) {
        taskLogRepository.saveAll(taskLogs);
    }
    @Transactional
    public void updateEmployeeScores(String employeeId, Double liveProductivityScore, Double overloadIndex) {
        Employee employee = employeeRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found with unique ID: " + employeeId));

        employee.setLiveProductivityScore(liveProductivityScore);
        employee.setOverloadIndex(overloadIndex);

        employeeRepository.save(employee);
    }

    public Double calculateAvailability(Long employeeId) {
        Employee employee = retrieveEmployeeById(employeeId);
        Double mandatoryHours = employee.getMandatoryWorkHours();

        Double assignedHours = assignmentRepository.sumOptimizedAssignedHoursByEmployee(employee);

        if (mandatoryHours == null || mandatoryHours <= 0) return 0.0;
        if (assignedHours == null) assignedHours = 0.0;

        double availability = ((mandatoryHours - assignedHours) / mandatoryHours) * 100.0;

        return Math.max(0.0, availability);
    }
}