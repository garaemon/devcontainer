# Jenkins Setup for Docker Builds

This guide explains how to configure Jenkins to run the Jenkinsfile in this repository, which builds Docker images using Docker Buildx.

## Problem

When running Jenkins in a Docker container, you may encounter this error:
```
docker: not found
```

This happens because the Jenkins container doesn't have access to Docker by default.

## Solution: Docker-outside-of-Docker (DooD)

The recommended approach is to use Docker-outside-of-Docker (DooD), where the Jenkins container uses the host's Docker daemon.

### Method 1: Quick Setup (Existing Jenkins Container)

If you already have a Jenkins container running:

```bash
# Replace <jenkins-container> with your Jenkins container name or ID

# 1. Install Docker CLI in the Jenkins container
docker exec -u root <jenkins-container> sh -c "apt-get update && apt-get install -y docker.io"

# 2. Add Jenkins user to docker group
docker exec -u root <jenkins-container> usermod -aG docker jenkins

# 3. Grant access to Docker socket
docker exec -u root <jenkins-container> chmod 666 /var/run/docker.sock

# 4. Restart Jenkins container
docker restart <jenkins-container>
```

### Method 2: Start Jenkins with Docker Support

If you're starting a new Jenkins container:

```bash
docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins/jenkins:lts

# Install Docker CLI
docker exec -u root jenkins sh -c "apt-get update && apt-get install -y docker.io"

# Add Jenkins user to docker group
docker exec -u root jenkins usermod -aG docker jenkins

# Grant access to Docker socket
docker exec -u root jenkins chmod 666 /var/run/docker.sock

# Restart Jenkins
docker restart jenkins
```

### Method 3: Using Docker Compose

Create a `docker-compose.yml`:

```yaml
version: '3.8'

services:
  jenkins:
    image: jenkins/jenkins:lts
    container_name: jenkins
    privileged: true
    user: root
    ports:
      - "8080:8080"
      - "50000:50000"
    volumes:
      - jenkins_home:/var/jenkins_home
      - /var/run/docker.sock:/var/run/docker.sock
    environment:
      - DOCKER_HOST=unix:///var/run/docker.sock
    command: >
      bash -c "
      apt-get update &&
      apt-get install -y docker.io &&
      usermod -aG docker jenkins &&
      chmod 666 /var/run/docker.sock &&
      /usr/local/bin/jenkins.sh
      "

volumes:
  jenkins_home:
```

Then run:
```bash
docker-compose up -d
```

### Method 4: Custom Jenkins Image (Recommended for Production)

Create a custom Jenkins image with Docker pre-installed:

**Dockerfile:**
```dockerfile
FROM jenkins/jenkins:lts

USER root

# Install Docker CLI
RUN apt-get update && \
    apt-get install -y docker.io && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Add Jenkins user to docker group
RUN usermod -aG docker jenkins

USER jenkins
```

Build and run:
```bash
docker build -t jenkins-with-docker .

docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins-with-docker
```

## Verification

After setup, verify Docker is accessible from Jenkins:

1. Go to Jenkins UI (http://localhost:8080)
2. Create a new Pipeline job
3. Use this test Pipeline script:

```groovy
pipeline {
    agent any
    stages {
        stage('Test Docker') {
            steps {
                sh 'docker --version'
                sh 'docker ps'
            }
        }
    }
}
```

4. Run the job. It should successfully display Docker version and running containers.

## Security Considerations

**Warning:** Mounting `/var/run/docker.sock` gives the Jenkins container full control over the Docker daemon. This is a security risk in multi-tenant environments.

For production:
- Use Docker-in-Docker (DinD) with proper isolation
- Restrict Jenkins user permissions
- Use Docker Content Trust
- Scan images for vulnerabilities
- Use separate Docker hosts for build agents

## Troubleshooting

### Error: "permission denied while trying to connect to the Docker daemon socket"

```bash
docker exec -u root <jenkins-container> chmod 666 /var/run/docker.sock
```

### Error: "Cannot connect to the Docker daemon"

Ensure the Docker socket is mounted:
```bash
docker inspect <jenkins-container> | grep "/var/run/docker.sock"
```

If not mounted, recreate the container with the `-v` flag.

### Error: "docker: command not found" after installation

Restart the Jenkins container:
```bash
docker restart <jenkins-container>
```

## Running the Build

Once Docker is configured:

1. Create a new Pipeline job in Jenkins
2. Configure it to use the repository: `https://github.com/garaemon/devcontainer`
3. Set the branch to: `2025.10.19-devcontainer-jenkins`
4. The Jenkinsfile will be automatically detected
5. Run the build

The pipeline will:
- Set up Docker Buildx
- Clean up old images
- Build all images for amd64 and arm64
- Test the built images
