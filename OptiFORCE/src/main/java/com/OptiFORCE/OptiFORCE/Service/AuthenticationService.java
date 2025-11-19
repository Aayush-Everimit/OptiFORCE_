package com.OptiFORCE.OptiFORCE.Service;

import com.OptiFORCE.OptiFORCE.Security.JwtUtils;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Service;

@Service
public class AuthenticationService {

    private final AuthenticationManager authenticationManager;
    private final JwtUtils jwtUtils;
    private final UserDetailsService userDetailsService;

    public AuthenticationService(
            AuthenticationManager authenticationManager,
            JwtUtils jwtUtils,
            UserDetailsService userDetailsService
    ) {
        this.authenticationManager = authenticationManager;
        this.jwtUtils = jwtUtils;
        this.userDetailsService = userDetailsService;
    }

    /**
     * Authenticates the user using username and password.
     * If authentication is successful, returns a JWT token.
     * Throws BadCredentialsException for wrong credentials.
     */
    public String login(String username, String password) {
        try {
            Authentication authentication = authenticationManager.authenticate(
                    new UsernamePasswordAuthenticationToken(username, password)
            );

            if (!authentication.isAuthenticated()) {
                throw new BadCredentialsException("Authentication failed");
            }

            // Optionally load user details for further checks/claims
            UserDetails userDetails = userDetailsService.loadUserByUsername(username);

            // Generate JWT using authenticated principal
            String token = jwtUtils.generateToken(authentication);
            return token;

        } catch (BadCredentialsException ex) {
            // Log authentication failures (if you have a logger)
            // logger.warn("Failed login for username {}: {}", username, ex.getMessage());
            throw new BadCredentialsException("Invalid username or password");
        } catch (Exception ex) {
            // Log unexpected errors
            // logger.error("Unexpected error during login: {}", ex.getMessage());
            throw new RuntimeException("Login failed: " + ex.getMessage());
        }
    }
}
