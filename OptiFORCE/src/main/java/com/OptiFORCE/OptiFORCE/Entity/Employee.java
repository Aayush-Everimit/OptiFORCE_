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
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "employees")
public class Employee {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
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

    // For authentication
    @Column(unique = true, nullable = false)
    private String username;

    @Column(nullable = false)
    private String password;  // Stored as BCrypt hash
}
