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

    // Constructor Injection
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
        // 1. Find the Employee using the unique business ID
        Employee employee = employeeRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found with unique ID: " + employeeId));

        // 2. USE THE PARAMETERS to update the entity fields
        employee.setLiveProductivityScore(liveProductivityScore);
        employee.setOverloadIndex(overloadIndex);

        // 3. Save the updated entity
        employeeRepository.save(employee);
    }

    // --- Business Logic ---

    /**
     * Calculates the employee's current resource availability based on mandatory hours and current assignments.
     * This uses the custom JpaRepository method defined previously.
     */
    public Double calculateAvailability(Long employeeId) {
        Employee employee = retrieveEmployeeById(employeeId);
        Double mandatoryHours = employee.getMandatoryWorkHours();

        // 1. Fetch current total assigned hours (using the custom Repository method)
        Double assignedHours = assignmentRepository.sumOptimizedAssignedHoursByEmployee(employee);

        // Handle null/zero hour scenarios
        if (mandatoryHours == null || mandatoryHours <= 0) return 0.0;
        if (assignedHours == null) assignedHours = 0.0;

        // 2. Calculate (Mandatory - Assigned) / Mandatory
        double availability = ((mandatoryHours - assignedHours) / mandatoryHours) * 100.0;

        // Ensure availability is not reported as negative (i.e., overloaded should show 0% available)
        //
        return Math.max(0.0, availability);
    }
}