package com.OptiFORCE.OptiFORCE.Service;

import com.OptiFORCE.OptiFORCE.Entity.Employee;
import com.OptiFORCE.OptiFORCE.Entity.TaskLog;
import com.OptiFORCE.OptiFORCE.Repository.EmployeeRepository;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
public class EmployeeService {

    private final EmployeeRepository employeeRepository;
    private final PasswordEncoder passwordEncoder;
    private final AssignmentService assignmentService;

    public EmployeeService(EmployeeRepository employeeRepository,
                           PasswordEncoder passwordEncoder,
                           AssignmentService assignmentService) {
        this.employeeRepository = employeeRepository;
        this.passwordEncoder = passwordEncoder;
        this.assignmentService = assignmentService;
    }

    @Transactional
    public Employee saveEmployee(Employee employee) {
        return employeeRepository.save(employee);
    }

    public List<Employee> retrieveAllEmployees() {
        return employeeRepository.findAll();
    }

    // Add missing method here per ProjectService dependency
    public List<Employee> getAllEmployeesForOptimization() {
        return employeeRepository.findAll();
    }

    public Optional<Employee> findByUsername(String username) {
        return employeeRepository.findByUsername(username);
    }

    public Optional<Employee> findByEmployeeId(String employeeId) {
        return employeeRepository.findByEmployeeId(employeeId);
    }

    @Transactional
    public Employee registerNewEmployee(String username, String rawPassword, String employeeId, String name) {
        if (employeeRepository.findByUsername(username).isPresent()) {
            throw new RuntimeException("Username already exists");
        }
        Employee employee = new Employee();
        employee.setUsername(username);
        employee.setPassword(passwordEncoder.encode(rawPassword));
        employee.setEmployeeId(employeeId);
        employee.setName(name);

        return employeeRepository.save(employee);
    }

    public void updateEmployeeScores(String employeeId, Double liveProductivityScore, Double overloadIndex) {
        // Implementation here
    }

    public void processNewTaskLogs(List<TaskLog> taskLog) {
        // Implementation here
    }

    // New method to get total optimized assigned hours for an employee
    public Double getOptimizedAssignedHoursForEmployee(String employeeId) {
        Employee employee = employeeRepository.findByEmployeeId(employeeId)
                .orElseThrow(() -> new RuntimeException("Employee not found"));
        return assignmentService.getTotalOptimizedAssignedHours(employee);
    }
}
