package com.OptiFORCE.OptiFORCE.Controller;

import com.OptiFORCE.OptiFORCE.Entity.Assignment;
import com.OptiFORCE.OptiFORCE.Entity.Project;
import com.OptiFORCE.OptiFORCE.Service.ProjectService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/projects")
public class ProjectController {

    private final ProjectService projectService;
    public ProjectController(ProjectService projectService) {
        this.projectService = projectService;
    }

    @PostMapping
    public ResponseEntity<Project> createNewProject(@RequestBody Project project) {
        Project newProject = projectService.saveProject(project);
        return ResponseEntity.status(HttpStatus.CREATED).body(newProject);
    }

    @GetMapping
    public List<Project> getAllProjects() {
        return projectService.getAllProjects();
    }
    @GetMapping("/{id}")
    public Project getProjectById(@PathVariable Long id) {
        return projectService.getProjectById(id);
    }


    @PostMapping("/{projectId}/optimize")
    public ResponseEntity<List<Assignment>> triggerOptimization(@PathVariable Long projectId) {
        List<Assignment> assignments = projectService.triggerOptimization(projectId);
        return ResponseEntity.ok(assignments);
    }
    @GetMapping("/{projectId}/assignment")
    public List<Assignment> getProjectAssignments(@PathVariable Long projectId) {
        return projectService.getProjectAssignments(projectId);
    }
}