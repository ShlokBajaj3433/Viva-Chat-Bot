# Viva Admin Portal - Docker Setup

This guide explains how to build and run the Viva Admin Portal using Docker.

## Prerequisites

- Docker installed on your system
- Docker Compose (optional, for easier management)
- Firebase service account JSON file

## Quick Start

### Option 1: Using Docker Compose (Recommended)

1. **Ensure firebase-service-account.json is in place:**
   ```bash
   # Make sure you have your firebase credentials
   ls firebase-service-account.json
   ```

2. **Build and run the container:**
   ```bash
   docker-compose up -d
   ```

3. **Check logs:**
   ```bash
   docker-compose logs -f viva-admin
   ```

4. **Access the application:**
   - Open your browser and navigate to: `http://localhost:8080`

5. **Stop the container:**
   ```bash
   docker-compose down
   ```

### Option 2: Using Docker CLI

1. **Build the Docker image:**
   ```bash
   docker build -t viva-admin:latest .
   ```

2. **Run the container:**
   ```bash
   docker run -d \
     --name viva-admin-portal \
     -p 8080:8080 \
     -v $(pwd)/firebase-service-account.json:/app/firebase-service-account.json:ro \
     -e SPRING_PROFILES_ACTIVE=production \
     viva-admin:latest
   ```

3. **View logs:**
   ```bash
   docker logs -f viva-admin-portal
   ```

4. **Stop the container:**
   ```bash
   docker stop viva-admin-portal
   docker rm viva-admin-portal
   ```

## Configuration

### Environment Variables

You can pass additional environment variables to customize the application:

```bash
docker run -d \
  --name viva-admin-portal \
  -p 8080:8080 \
  -e SPRING_PROFILES_ACTIVE=production \
  -e JAVA_OPTS="-Xmx1g -Xms512m" \
  -e SERVER_PORT=8080 \
  -v $(pwd)/firebase-service-account.json:/app/firebase-service-account.json:ro \
  viva-admin:latest
```

### Port Configuration

To run on a different port, modify the port mapping:

```bash
# Run on port 9090 instead of 8080
docker run -d -p 9090:8080 viva-admin:latest
```

## Building for Production

For production deployment:

1. **Build an optimized image:**
   ```bash
   docker build --no-cache -t viva-admin:prod .
   ```

2. **Tag for registry (if using a container registry):**
   ```bash
   docker tag viva-admin:prod your-registry.com/viva-admin:1.0.0
   docker push your-registry.com/viva-admin:1.0.0
   ```

## Troubleshooting

### Container won't start

Check the logs:
```bash
docker logs viva-admin-portal
```

### Permission issues with firebase credentials

Ensure the file has correct permissions:
```bash
chmod 644 firebase-service-account.json
```

### Out of memory errors

Increase Java heap size:
```bash
docker run -e JAVA_OPTS="-Xmx1g" viva-admin:latest
```

### Health check failures

Wait for the application to fully start (can take 30-60 seconds on first run).

## Docker Image Information

- **Base Image:** Eclipse Temurin JRE 17 (Alpine Linux)
- **Size:** ~200-250 MB (optimized)
- **Security:** Runs as non-root user
- **Health Check:** Built-in health check endpoint

## Advanced Usage

### Running with custom configuration

Mount a custom application.properties:
```bash
docker run -v $(pwd)/custom-application.properties:/app/config/application.properties:ro viva-admin:latest
```

### Debugging inside the container

Access the container shell:
```bash
docker exec -it viva-admin-portal /bin/sh
```

### Viewing resource usage

```bash
docker stats viva-admin-portal
```

## Cleanup

Remove all Viva Admin containers and images:
```bash
docker-compose down
docker rmi viva-admin:latest
```

## Support

For issues or questions, refer to the main README.md or contact the development team.
