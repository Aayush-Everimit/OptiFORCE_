package com.OptiFORCE.OptiFORCE.Service;

import com.OptiFORCE.OptiFORCE.Entity.Assignment;
import com.OptiFORCE.OptiFORCE.Entity.Project;
import com.OptiFORCE.OptiFORCE.Repository.AssignmentRepository;
import com.OptiFORCE.OptiFORCE.Repository.ProjectRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import java.util.List;

@Service
public class AssignmentService {

    private final AssignmentRepository assignmentRepository;
    private final ProjectRepository projectRepository;

    public AssignmentService(AssignmentRepository assignmentRepository, ProjectRepository projectRepository) {
        this.assignmentRepository = assignmentRepository;
        this.projectRepository = projectRepository;
    }

  @Transactional
    public Project saveAssignmentsAndUpdateProjectCost(Project project, List<Assignment> assignments) {
        assignmentRepository.saveAll(assignments);

        double totalCost = assignments.stream()
                .mapToDouble(Assignment::getOptimizedAssignedHours)
                .sum();


        project.setTotalStaffingCost(totalCost);
        return projectRepository.save(project);
    }

    public List<Assignment> getAssignmentsByProject(Long projectId) {
        Project project = projectRepository.findById(projectId)
                .orElseThrow(() -> new IllegalArgumentException("Project not found with ID: " + projectId));

        return assignmentRepository.findByProject(project);
    }
}