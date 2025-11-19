package com.OptiFORCE.OptiFORCE.Service;

import com.OptiFORCE.OptiFORCE.dto.EmployeeFeaturesRequest;
import com.OptiFORCE.OptiFORCE.integration.EmployeePerformanceModelClient;
import org.springframework.stereotype.Service;

import java.util.Map;

@Service
public class PerformancePredictionService {

    private final EmployeePerformanceModelClient modelClient;

    public PerformancePredictionService(EmployeePerformanceModelClient modelClient) {
        this.modelClient = modelClient;
    }

    public Map<String, Object> predictById(Long empId) {
        return modelClient.predictById(empId);
    }

    public Map<String, Object> predictFromFeatures(EmployeeFeaturesRequest features) {
        return modelClient.predictFromFeatures(features);
    }
}
