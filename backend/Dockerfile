# Use official OpenJDK image
FROM openjdk:17-jdk-slim

# Set working directory inside the container
WORKDIR /app

# Copy Maven wrapper and pom.xml first to take advantage of Docker caching
COPY mvnw .
COPY .mvn .mvn
COPY pom.xml .

# Pre-download dependencies (optional but faster rebuilds)
RUN ./mvnw dependency:go-offline

# Copy full project
COPY . .

# Build the application
RUN ./mvnw clean install

# Run the generated jar file (assumes 1 jar inside target/)
CMD ["sh", "-c", "java -jar target/*.jar"]