FROM jenkins/jenkins:lts

USER root

# Install Docker CLI
RUN apt-get update && \
    apt-get install -y \
        docker.io \
        apt-transport-https \
        ca-certificates \
        curl \
        gnupg \
        lsb-release && \
    apt-get clean && \
    rm -rf /var/lib/apt/lists/*

# Add Jenkins user to docker group
RUN usermod -aG docker jenkins

# Install additional tools (add your tools here)
# Example: Install Node.js, Python, etc.
# RUN apt-get update && \
#     apt-get install -y nodejs npm python3 python3-pip && \
#     apt-get clean && \
#     rm -rf /var/lib/apt/lists/*

USER jenkins

# Pre-install Jenkins plugins (optional)
# RUN jenkins-plugin-cli --plugins "docker-workflow:latest git:latest"
