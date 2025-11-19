package com.OptiFORCE.OptiFORCE.dto;

import com.OptiFORCE.OptiFORCE.Entity.Project;
import com.OptiFORCE.OptiFORCE.Entity.Employee;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class OptimizationRequest {
    private Project projectDetails;
    private List<Employee> candidates;
}
