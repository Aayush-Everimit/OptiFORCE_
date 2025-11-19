package com.OptiFORCE.OptiFORCE.dto;

import lombok.Getter;
import lombok.Setter;

@Getter
@Setter
public class EmployeeFeaturesRequest {
    private float Age;
    private float ExperienceYears;
    private float ProjectsCompleted;
    private float AvgProjectRating;
    private float AttendanceRate;
    private float OvertimeHours;
    private int PromotionLast3Yrs;
}