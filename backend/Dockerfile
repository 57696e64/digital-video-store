# Use OpenJDK 21 as the base image
FROM eclipse-temurin:21-jdk

# Set working directory
WORKDIR /app

# Copy project files
COPY . .

# Grant permission to run the wrapper
RUN chmod +x ./mvnw

# Build the application (use clean package to create the jar)
RUN ./mvnw clean package -DskipTests

# Find .jar
RUN ln -s target/*.jar app.jar

# CMD
CMD ["java", "-jar", "app.jar"]
