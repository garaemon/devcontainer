# Setup gh command
FROM ubuntu:noble

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
  git \
  gh \
  zsh \
  && apt-get clean \
  && rm -rf /var/lib/apt/lists/*

# There is ubuntu user. We don't need to make it.
