package com.OptiFORCE.OptiFORCE.Repository;

import com.OptiFORCE.OptiFORCE.Entity.Employee;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface EmployeeRepository extends JpaRepository<Employee, Long> {
}
