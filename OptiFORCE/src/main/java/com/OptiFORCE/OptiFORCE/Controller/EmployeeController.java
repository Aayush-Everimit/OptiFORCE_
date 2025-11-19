package com.OptiFORCE.OptiFORCE.Controller;

import com.OptiFORCE.OptiFORCE.Entity.Employee;
import com.OptiFORCE.OptiFORCE.Entity.TaskLog;
import com.OptiFORCE.OptiFORCE.Service.EmployeeService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/employees")
public class EmployeeController {

    private final EmployeeService employeeService;

    public EmployeeController(EmployeeService employeeService) {
        this.employeeService = employeeService;
    }

    @PostMapping
    public ResponseEntity<Employee> onboardEmployee(@RequestBody Employee employee) {
        Employee saved = employeeService.saveEmployee(employee);
        return ResponseEntity.status(HttpStatus.CREATED).body(saved);
    }

    @GetMapping
    public List<Employee> retrieveAllEmployees() {
        return employeeService.retrieveAllEmployees();
    }

    @GetMapping("/{id}")
    public Optional<Employee> retrieveEmployeeById(@PathVariable String id) {
        return employeeService.findByEmployeeId(id);
    }

    @PostMapping("/task-logs")
    public ResponseEntity<Boolean> TaskLogs(@RequestBody TaskLog taskLog) {
        employeeService.processNewTaskLogs(List.of(taskLog));
        return ResponseEntity.accepted().build();
    }

    @PutMapping("/scores")
    public ResponseEntity<Boolean> updateAiScores(@RequestBody Employee employeeUpdated) {
        employeeService.updateEmployeeScores(
                employeeUpdated.getEmployeeId(),
                employeeUpdated.getLiveProductivityScore(),
                employeeUpdated.getOverloadIndex()
        );
        return ResponseEntity.noContent().build();
    }
}