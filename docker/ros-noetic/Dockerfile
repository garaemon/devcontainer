# Setup gh command
FROM ros:noetic

# Set up the apt repository to install gh.
# See https://github.com/cli/cli/blob/trunk/docs/install_linux.md#debian-ubuntu-linux-raspberry-pi-os-apt
RUN apt-get update && apt-get install wget -y \
	&& mkdir -p -m 755 /etc/apt/keyrings \
	&& wget -qO- https://cli.github.com/packages/githubcli-archive-keyring.gpg | tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
	&& chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
	&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Install additional apt packages
RUN apt-get update && apt-get install -y \
    python3-catkin-tools \
    git \
    gh \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create ubuntu user because ros:noetic uses root user.
# TODO: Do we need to specify user id?
RUN useradd -rm -d /home/ubuntu -s /bin/bash -g root -G sudo -u 1001 ubuntu
USER ubuntu
WORKDIR /home/ubuntu
