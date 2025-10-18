# Setup gh command
FROM ros:humble

# Set up the apt repository to install gh.
# See https://github.com/cli/cli/blob/trunk/docs/install_linux.md#debian-ubuntu-linux-raspberry-pi-os-apt
RUN apt-get update && apt-get install wget -y --no-install-recommends \
	&& mkdir -p -m 755 /etc/apt/keyrings \
	&& wget -qO- https://cli.github.com/packages/githubcli-archive-keyring.gpg | tee /etc/apt/keyrings/githubcli-archive-keyring.gpg > /dev/null \
	&& chmod go+r /etc/apt/keyrings/githubcli-archive-keyring.gpg \
	&& echo "deb [arch=$(dpkg --print-architecture) signed-by=/etc/apt/keyrings/githubcli-archive-keyring.gpg] https://cli.github.com/packages stable main" | tee /etc/apt/sources.list.d/github-cli.list > /dev/null \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# Install additional apt packages
RUN apt-get update && apt-get install -y --no-install-recommends \
    python3-colcon-common-extensions \
    git \
    gh \
    zsh \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Create ubuntu user because ros:humble uses root user.
# TODO: Do we need to specify user id?
RUN useradd -rm -d /home/ubuntu -s /bin/bash -g root -G sudo -u 1001 ubuntu
# The docker image contains `%sudo   ALL=(ALL:ALL) ALL` in /etc/sudoers.
# However, it requires password and ubuntu user does not have password.
# To allow ubuntu user to use sudo without password, add the following line to /etc/sudoers.
RUN echo '%sudo ALL=(ALL) NOPASSWD:ALL' >> /etc/sudoers
USER ubuntu
WORKDIR /home/ubuntu
