package com.OptiFORCE.OptiFORCE.dto;


import lombok.Data;

@Data
public class RegisterRequest {
    private String username;
    private String password;
    private String employeeId;
    private String name;
}