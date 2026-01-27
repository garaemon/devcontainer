# ROS Noetic Dev Container

This Docker image provides a development environment based on ROS Noetic Ninjemys. It is designed for developing ROS 1 applications and includes Claude Code for AI-assisted development.

## Base Image
- `ros:noetic`

## Key Features
- **ROS Noetic**: Pre-installed ROS Noetic base.
- **Build Tools**: Includes `catkin-tools` (`python3-catkin-tools`).
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
