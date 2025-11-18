package com.OptiFORCE.OptiFORCE.integration;

import org.springframework.context.annotation.Configuration;
import org.springframework.cloud.openfeign.EnableFeignClients;

// Crucial: You must use @EnableFeignClients on your main application class
// or in a dedicated configuration class like this.
@Configuration
@EnableFeignClients(basePackages = "com.OptiFORCE.OptiFORCE.integration")
public class IntegrationConfig {

    // Any required custom encoders/decoders for Jackson or Feign can be defined here.
    // For the MVP, the default settings should be sufficient.
}