package com.OptiFORCE.OptiFORCE.integration;

import com.OptiFORCE.OptiFORCE.Entity.Employee;
import com.OptiFORCE.OptiFORCE.Entity.TaskLog;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

// This service calculates the P_score and Overload Index
@FeignClient(name = "productivity-ai", url = "${ai.service.productivity-url}")
public interface ProductivityClient {

    /**
     * Sends raw TaskLog data to the AI service for processing and returns
     * a list of updated Employee score DTOs.
     * @param logs The raw activity logs for a specific employee/period.
     * @return List of Employee entities (or DTOs) containing updated P_score and OverloadIndex.
     */
    @PostMapping("/calculate-scores")
    List<Employee> calculateScores(@RequestBody List<TaskLog> logs);

    // You can add other endpoints here, e.g., for fault analysis
}