# Custom Jenkins Image with Docker Support

This directory contains a custom Jenkins Docker image with Docker CLI pre-installed.

## Quick Start

### Using Docker Compose (Recommended)

```bash
cd jenkins
docker-compose up -d
```

Access Jenkins at: http://localhost:8080

### Using Docker Build

```bash
# Build the image
cd jenkins
docker build -t jenkins-with-docker .

# Run the container
docker run -d \
  --name jenkins \
  -p 8080:8080 \
  -p 50000:50000 \
  -v jenkins_home:/var/jenkins_home \
  -v /var/run/docker.sock:/var/run/docker.sock \
  jenkins-with-docker
```

## Customization

### Adding Additional Tools

Edit the `Dockerfile` and add your required packages:

```dockerfile
# Install additional tools
RUN apt-get update && \
    apt-get install -y \
        nodejs \
        npm \
        python3 \
        python3-pip \
        git \
        vim && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*
```

### Installing Jenkins Plugins

Uncomment and modify the plugin installation line in `Dockerfile`:

```dockerfile
RUN jenkins-plugin-cli --plugins \
    "docker-workflow:latest" \
    "git:latest" \
    "pipeline-stage-view:latest"
```

### Rebuilding After Changes

```bash
docker-compose down
docker-compose build --no-cache
docker-compose up -d
```

## Directory Structure

```
jenkins/
├── Dockerfile           # Custom Jenkins image definition
├── docker-compose.yml   # Docker Compose configuration
└── README.md           # This file
```

## Features

- Based on `jenkins/jenkins:lts`
- Docker CLI pre-installed
- Jenkins user added to docker group
- Ready for Docker-based builds
- Persistent Jenkins home directory
- Exposed ports: 8080 (web UI), 50000 (agent)

## Management

### View Logs

```bash
docker-compose logs -f
```

### Stop Jenkins

```bash
docker-compose down
```

### Restart Jenkins

```bash
docker-compose restart
```

### Remove Everything (including data)

```bash
docker-compose down -v
```

## Troubleshooting

### Jenkins can't access Docker

Ensure the Docker socket is properly mounted and has correct permissions:

```bash
docker exec -u root jenkins-with-docker chmod 666 /var/run/docker.sock
docker restart jenkins-with-docker
```

### Changes to Dockerfile not reflected

Rebuild without cache:

```bash
docker-compose build --no-cache
docker-compose up -d
```
