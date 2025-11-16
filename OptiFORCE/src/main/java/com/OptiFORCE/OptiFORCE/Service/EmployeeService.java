package com.OptiFORCE.OptiFORCE.Service;

import com.OptiFORCE.OptiFORCE.Entity.Employee;
import com.OptiFORCE.OptiFORCE.Entity.TaskLog;
import com.OptiFORCE.OptiFORCE.Repository.EmployeeRepository;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class EmployeeService
{
    private final EmployeeRepository employeeRepository;

    public EmployeeService(EmployeeRepository employeeRepository) {
        this.employeeRepository = employeeRepository;
    }

    public Employee saveEmployee(Employee employee)
    {
        return employeeRepository.save(employee);
    }

    public List<Employee> retrieveAllEmployees()
    {
        return employeeRepository.findAll();
    }

    public Employee retrieveEmployees(Long id)
    {
        return  employeeRepository.findById(id).orElse(null);
    }

    public void processNewTaskLogs(TaskLog taskLog) {
    }

    public void updateEmployeeScores(String employeeId, Double liveProductivityScore, Double overloadIndex) {
    }
}
