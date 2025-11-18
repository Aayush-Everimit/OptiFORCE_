package com.OptiFORCE.OptiFORCE.integration;

import org.springframework.context.annotation.Configuration;
import org.springframework.cloud.openfeign.EnableFeignClients;
@Configuration
@EnableFeignClients(basePackages = "com.OptiFORCE.OptiFORCE.integration")
public class IntegrationConfig {
}