# Use an official JDK image as the base
FROM eclipse-temurin:17-jdk

# Set working directory
WORKDIR /app

# Copy Maven wrapper and grant permission
COPY mvnw .
RUN chmod +x mvnw

# Copy Maven wrapper folder and pom.xml
COPY .mvn .mvn
COPY pom.xml .

# Pre-download dependencies
RUN ./mvnw dependency:go-offline

# Copy full source code
COPY src src

# Build the application
RUN ./mvnw package

# Run the built jar file
CMD ["java", "-jar", "target/*.jar"]