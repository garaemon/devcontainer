# Ubuntu Focal Dev Container

This Docker image provides a general-purpose development environment based on Ubuntu 20.04 (Focal Fossa). It includes essential development tools and Claude Code for AI-assisted development.

## Base Image
- `ubuntu:focal`

## Key Features
- **Ubuntu 20.04**: Stable LTS base.
- **Claude Code**: Pre-installed `@anthropic-ai/claude-code` for AI coding assistance.
- **Developer Tools**:
  - `gh` (GitHub CLI)
  - `git`
  - `zsh`
  - `sudo`
  - `curl`
  - Node.js (LTS)
- **User Configuration**:
  - Non-root `ubuntu` user (UID 1001)
  - Passwordless `sudo` access
