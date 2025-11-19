FROM eclipse-temurin:17-jdk-alpine

WORKDIR /app

# Copy build JAR
COPY target/*.jar /app/app.jar

# Expose your service port (keep consistent!)
EXPOSE 8080

ENTRYPOINT ["java", "-jar", "/app/app.jar"]
