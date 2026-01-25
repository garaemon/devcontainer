ARG PLAYWRIGHT_VERSION=1.49.1
ARG GEMINI_VERSION=0.21.0

FROM mcr.microsoft.com/playwright:v${PLAYWRIGHT_VERSION}-noble

# Re-declare ARGs to make them available after FROM
ARG PLAYWRIGHT_VERSION
ARG GEMINI_VERSION

ENV DEBIAN_FRONTEND=noninteractive

# Install gh and dependencies
RUN apt-get update && apt-get install -y --no-install-recommends \
    wget \
    ca-certificates \
    curl \
    git \
    sudo \
    unzip \
    zsh \
    gnupg \
    && mkdir -p -m 755 /etc/apt/keyrings \
    && wget -qO- https://cli.github.com/packages/githubcli-archive-keyring.gpg | tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
    && chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
    && echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
    && apt-get update && apt-get install -y --no-install-recommends \
    gh \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Install Playwright and Gemini SDK
RUN npm install -g playwright@${PLAYWRIGHT_VERSION} @google/generative-ai@${GEMINI_VERSION} @google/gemini-cli

# Setup ubuntu user
RUN if ! id -u ubuntu > /dev/null 2>&1; then useradd -m -s /bin/bash ubuntu; fi \
    && echo 'ubuntu ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers

USER ubuntu
WORKDIR /home/ubuntu

CMD ["gemini"]
