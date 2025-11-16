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
@Table(name = "employees")
@NoArgsConstructor
@AllArgsConstructor
public class Employee
{
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;


    private String employeeId;
    private String name;
    private String roleTitle;
    private String department;
    private String employmentStatus;


    private Double costPerHour;
    private Double mandatoryWorkHours;
    private Double clientBillingRate;
    private LocalDate employmentDate;

    private Double liveProductivityScore;
    private Double overloadIndex;
    private Double availabilityPercent;
}
