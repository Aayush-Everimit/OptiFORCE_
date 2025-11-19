package com.OptiFORCE.OptiFORCE.Repository;

import com.OptiFORCE.OptiFORCE.Entity.Assignment;
import com.OptiFORCE.OptiFORCE.Entity.Employee;
import com.OptiFORCE.OptiFORCE.Entity.Project;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
    List<Assignment> findByProject(Project project);

    @Query("SELECT COALESCE(SUM(a.optimizedAssignedHours), 0) FROM Assignment a WHERE a.employee = ?1")
    Double sumOptimizedAssignedHoursByEmployee(Employee employee);
}
