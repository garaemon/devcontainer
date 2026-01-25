const { execSync } = require('child_process');

try {
  console.log("Checking for 'gemini' CLI...");
  const output = execSync('gemini --version', { encoding: 'utf-8' });
  console.log(`Gemini CLI found: ${output.trim()}`);
} catch (e) {
  console.error("Gemini CLI not found or failed to run.");
  console.error(`Error: ${e.message}`);
  process.exit(1);
}
