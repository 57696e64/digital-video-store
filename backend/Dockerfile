# Set working directory
WORKDIR /app

# Copy wrapper and grant permission
COPY mvnw .
RUN chmod +x mvnw

# Copy the wrapper support folder and pom.xml
COPY .mvn .mvn
COPY pom.xml .

# Pre-download dependencies (optional but useful)
RUN ./mvnw dependency:go-offline

# Copy the full project
COPY src src

# Build and package
RUN ./mvnw package

# Run the app
CMD ["java", "-jar", "target/*.jar"]
