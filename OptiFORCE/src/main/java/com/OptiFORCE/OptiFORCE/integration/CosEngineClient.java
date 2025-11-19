package com.OptiFORCE.OptiFORCE.integration;

import com.OptiFORCE.OptiFORCE.Entity.Assignment;
import com.OptiFORCE.OptiFORCE.dto.OptimizationRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;

import java.util.List;

@FeignClient(name = "cos-engine", url = "${ai.service.optimization-url}")
public interface CosEngineClient {

    @PostMapping("/optimize")
    List<Assignment> runOptimization(@RequestBody OptimizationRequest request);
}
