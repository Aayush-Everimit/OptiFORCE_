package com.OptiFORCE.OptiFORCE.Service;

import com.OptiFORCE.OptiFORCE.Entity.Employee;
import com.OptiFORCE.OptiFORCE.Entity.TaskLog;
import com.OptiFORCE.OptiFORCE.Repository.EmployeeRepository;
import com.OptiFORCE.OptiFORCE.Repository.TaskLogRepository;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.time.LocalDateTime;
import java.util.List;

@Service
public class TaskLogService {
    private final TaskLogRepository taskLogRepository;
    private final EmployeeRepository employeeRepository;

    public TaskLogService(TaskLogRepository taskLogRepository, EmployeeRepository employeeRepository) {
        this.taskLogRepository = taskLogRepository;
        this.employeeRepository = employeeRepository;
    }

    @Transactional
    public void processNewTaskLogs(List<TaskLog> taskLogs) {
        taskLogRepository.saveAll(taskLogs);
    }

    public List<TaskLog> fetchLogsForAiRecalculation(Long employeeId, int days) {
        Employee employee = employeeRepository.findById(employeeId)
                .orElseThrow(() -> new IllegalArgumentException("Employee not found for log fetch. ID: " + employeeId));
        LocalDateTime endTime = LocalDateTime.now();
        LocalDateTime startTime = endTime.minusDays(days);
        return taskLogRepository.findByEmployeeAndLogTimestampBetween(employee, startTime, endTime);
    }
}
