package com.OptiFORCE.OptiFORCE.Controller;

import com.OptiFORCE.OptiFORCE.dto.EmployeeFeaturesRequest;
import com.OptiFORCE.OptiFORCE.Service.PerformancePredictionService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;

@RestController
@RequestMapping("/api/predict")
public class PerformancePredictionController {

    private final PerformancePredictionService predictionService;

    public PerformancePredictionController(PerformancePredictionService predictionService) {
        this.predictionService = predictionService;
    }

    @GetMapping("/id/{empId}")
    public ResponseEntity<Map<String, Object>> predictById(@PathVariable Long empId) {
        Map<String, Object> result = predictionService.predictById(empId);
        return ResponseEntity.ok(result);
    }
    @PostMapping("/features")
    public ResponseEntity<Map<String, Object>> predictFromFeatures(@RequestBody EmployeeFeaturesRequest features) {
        Map<String, Object> result = predictionService.predictFromFeatures(features);
        return ResponseEntity.ok(result);
    }
}
