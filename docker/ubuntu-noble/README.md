# Ubuntu Noble Dev Container

This Docker image provides a general-purpose development environment based on Ubuntu 24.04 (Noble Numbat). It includes essential development tools and Claude Code for AI-assisted development.

## Base Image
- `ubuntu:noble`

## Key Features
- **Ubuntu 24.04**: Latest LTS base.
- **Claude Code**: Pre-installed `@anthropic-ai/claude-code` for AI coding assistance.
- **Developer Tools**:
  - `gh` (GitHub CLI)
  - `git`
  - `zsh`
  - `sudo`
  - `curl`
  - Node.js (LTS)
- **User Configuration**:
  - Non-root `ubuntu` user
  - Passwordless `sudo` access
