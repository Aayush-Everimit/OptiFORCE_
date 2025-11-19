package com.OptiFORCE.OptiFORCE.Repository;

import com.OptiFORCE.OptiFORCE.Entity.Employee;
import com.OptiFORCE.OptiFORCE.Entity.TaskLog;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.time.LocalDateTime;
import java.util.List;

@Repository
public interface TaskLogRepository extends JpaRepository<TaskLog, Long> {

    List<TaskLog> findByEmployeeAndLogTimestampBetween(Employee employee, LocalDateTime startTime, LocalDateTime endTime);
}
