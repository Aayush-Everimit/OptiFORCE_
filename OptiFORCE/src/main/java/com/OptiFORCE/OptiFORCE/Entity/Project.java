package com.OptiFORCE.OptiFORCE.Entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.time.LocalDate;

@Entity
@Getter
@Setter
@Table(name = "projects")
@NoArgsConstructor
@AllArgsConstructor
public class Project {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String projectName;
    private String requiredSkills;
    private LocalDate deadline;
    private Double totalProjectBudget;
    private String projectPhase;

    private Double delayRiskScore;
    private Double totalStaffingCost;
    private Double billableHoursTotal;
    private Double nonBillableCost;
}
