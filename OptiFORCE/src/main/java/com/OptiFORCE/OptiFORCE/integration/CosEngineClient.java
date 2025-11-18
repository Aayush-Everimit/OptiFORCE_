package com.OptiFORCE.OptiFORCE.integration;

import com.OptiFORCE.OptiFORCE.Entity.Assignment;
import com.OptiFORCE.OptiFORCE.Entity.Employee;
import com.OptiFORCE.OptiFORCE.Entity.Project;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

// The 'name' is for Spring's internal mapping; 'url' is set in application.yml
@FeignClient(name = "cos-engine", url = "${ai.service.optimization-url}")
public interface CosEngineClient {
    @PostMapping("/optimize")
    List<Assignment> runOptimization(@RequestBody Project project, @RequestBody List<Employee> employees);
}