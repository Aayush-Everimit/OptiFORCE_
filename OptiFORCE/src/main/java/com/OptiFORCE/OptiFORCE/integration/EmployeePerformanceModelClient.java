package com.OptiFORCE.OptiFORCE.integration;

import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

import com.OptiFORCE.OptiFORCE.dto.EmployeeFeaturesRequest;

import java.util.Map;

@FeignClient(name = "employee-performance-model", url = "${ai.service.productivity-url}")
public interface EmployeePerformanceModelClient {

    @GetMapping("/predict/id/{empId}")
    Map<String, Object> predictById(@PathVariable("empId") Long empId);

    @PostMapping("/predict/features")
    Map<String, Object> predictFromFeatures(@RequestBody EmployeeFeaturesRequest data);
}
