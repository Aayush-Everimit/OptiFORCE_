package com.OptiFORCE.OptiFORCE.integration;

import com.OptiFORCE.OptiFORCE.Entity.Employee;
import com.OptiFORCE.OptiFORCE.Entity.TaskLog;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;
@FeignClient(name = "productivity-ai", url = "${ai.service.productivity-url}")
public interface ProductivityClient {

    @PostMapping("/calculate-scores")
    List<Employee> calculateScores(@RequestBody List<TaskLog> logs);
}