# Stage 1: Build Image - Use a smaller, secure base image
FROM eclipse-temurin:17-jdk-alpine AS builder

# Set the working directory
WORKDIR /app

# Copy the built JAR file from the host machine
# Assumes you run 'mvn clean package' before building the Docker image
COPY target/*.jar /app/app.jar

# Expose the application port (matching server.port=8081)
EXPOSE 8081

# Stage 2: Define the command that runs the application
# ENTRYPOINT or CMD is essential for starting the application process
ENTRYPOINT ["java", "-jar", "/app/app.jar"]