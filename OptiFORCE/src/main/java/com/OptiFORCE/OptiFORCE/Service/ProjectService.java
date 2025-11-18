package com.OptiFORCE.OptiFORCE.Service;

import com.OptiFORCE.OptiFORCE.Entity.Assignment;
import com.OptiFORCE.OptiFORCE.Entity.Employee;
import com.OptiFORCE.OptiFORCE.Entity.Project;
import com.OptiFORCE.OptiFORCE.Repository.ProjectRepository;
import com.OptiFORCE.OptiFORCE.integration.CosEngineClient;
import com.OptiFORCE.OptiFORCE.dto.OptimizationRequest;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;

@Service
public class ProjectService {

    private final ProjectRepository projectRepository;
    private final EmployeeService employeeService;
    private final CosEngineClient cosEngineClient;
    private final AssignmentService assignmentService;

    public ProjectService(
            ProjectRepository projectRepository,
            EmployeeService employeeService,
            CosEngineClient cosEngineClient,
            AssignmentService assignmentService) {

        this.projectRepository = projectRepository;
        this.employeeService = employeeService;
        this.cosEngineClient = cosEngineClient;
        this.assignmentService = assignmentService;
    }

    @Transactional
    public Project saveProject(Project project) {
        return projectRepository.save(project);
    }

    public Project getProjectById(Long id) {
        return projectRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + id));
    }

    public List<Project> getAllProjects() {
        return projectRepository.findAll();
    }

    @Transactional
    public List<Assignment> triggerOptimization(Long projectId) {
        Project project = getProjectById(projectId);
        List<Employee> allEmployees = employeeService.getAllEmployeesForOptimization();

        OptimizationRequest request = new OptimizationRequest(project, allEmployees);
        List<Assignment> assignments = cosEngineClient.runOptimization(request); // Method signature changed

        if (assignments.isEmpty()) {
            throw new RuntimeException("Optimization engine returned no assignments.");
        }

        assignmentService.saveAssignmentsAndUpdateProjectCost(project, assignments);
        return assignments;
    }


    public List<Assignment> getProjectAssignments(Long projectId) {
        getProjectById(projectId);
        return assignmentService.getAssignmentsByProject(projectId);
    }
}