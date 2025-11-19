package com.OptiFORCE.OptiFORCE.Controller;

import com.OptiFORCE.OptiFORCE.Service.AuthenticationService;
import com.OptiFORCE.OptiFORCE.Service.EmployeeService;
import com.OptiFORCE.OptiFORCE.dto.LoginRequest;
import com.OptiFORCE.OptiFORCE.dto.RegisterRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/auth")
public class AuthController {

    private final EmployeeService employeeService;
    private final AuthenticationService authenticationService;

    public AuthController(EmployeeService employeeService,
                          AuthenticationService authenticationService) {
        this.employeeService = employeeService;
        this.authenticationService = authenticationService;
    }

    @PostMapping("/register")
    public ResponseEntity<String> register(@RequestBody RegisterRequest request) {
        try {
            employeeService.registerNewEmployee(
                    request.getUsername(),
                    request.getPassword(),
                    request.getEmployeeId(),
                    request.getName()
            );
            return new ResponseEntity<>("User registered successfully", HttpStatus.CREATED);
        } catch (RuntimeException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<?> login(@RequestBody LoginRequest request) {
        try {
            String token = authenticationService.login(request.getUsername(), request.getPassword());
            return ResponseEntity.ok(token);
        } catch (BadCredentialsException ex) {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Invalid username or password");
        } catch (Exception ex) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Login failed: " + ex.getMessage());
        }
    }
}
