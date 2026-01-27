# ROS Humble Dev Container

This Docker image provides a development environment based on ROS Humble Hawksbill. It is designed for developing ROS 2 applications and includes Claude Code for AI-assisted development.

## Base Image
- `ros:humble`

## Key Features
- **ROS 2 Humble**: Pre-installed ROS 2 Humble base.
- **Build Tools**: Includes `colcon` build tools (`python3-colcon-core`, `python3-colcon-common-extensions`).
- **Claude Code**: Pre-installed `@anthropic-ai/claude-code` for AI coding assistance.
- **Developer Tools**:
  - `gh` (GitHub CLI)
  - `git`
  - `zsh`
  - `curl`
  - Node.js (LTS)
- **User Configuration**:
  - Non-root `ubuntu` user (UID 1001)
  - Passwordless `sudo` access
