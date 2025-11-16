package com.OptiFORCE.OptiFORCE.Repository;

import com.OptiFORCE.OptiFORCE.Entity.Assignment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface AssignmentRepository extends JpaRepository<Assignment, Long> {
}
