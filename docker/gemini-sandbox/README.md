# Gemini Sandbox Docker Image

This Docker image is designed to provide a secure and reproducible sandbox environment for running Gemini CLI and SDK with full Playwright support.

## Purpose

The primary goal of this image is to enable Gemini-based agents or tools to interact with the web using Playwright while operating within a containerized sandbox. This ensures that the execution environment is isolated from the host system while still having all the necessary dependencies for browser automation and AI interaction.

## Key Features

- **Ubuntu 24.04 (Noble)**: Built on the latest Ubuntu LTS for long-term stability and modern package support.
- **Playwright Pre-configured**: Based on the official Microsoft Playwright image, it includes all necessary system dependencies and browsers (Chromium, Firefox, WebKit).
- **Gemini Ready**: Pre-installed with:
  - `@google/generative-ai`: The official Node.js SDK for Gemini.
  - `@google/gemini-cli`: The command-line interface for interacting with Gemini.
- **Developer Friendly**: 
  - Includes `gh` (GitHub CLI), `git`, `zsh`, `sudo`, and `curl`.
  - Non-root `ubuntu` user configured with passwordless `sudo` access.
  - Default command is set to `gemini`.

## Usage

### Building the Image

```bash
docker build -t gemini-sandbox -f docker/gemini-sandbox/Dockerfile .
```

### Running the Sandbox

You can start an interactive session:

```bash
docker run -it --rm gemini-sandbox
```

### Running with Playwright

Since the browsers are pre-installed in `/ms-playwright`, you can run Playwright scripts immediately. Note that when running in Docker, you should typically use `headless: true`.

```javascript
const { chromium } = require('playwright');
(async () => {
  const browser = await chromium.launch();
  // ... your automation logic
  await browser.close();
})();
```

## Maintenance

The versions of Playwright and Gemini are managed via build arguments in the `Dockerfile`:
- `PLAYWRIGHT_VERSION`: Default is `1.49.1`
- `GEMINI_VERSION`: Default is `0.21.0`
