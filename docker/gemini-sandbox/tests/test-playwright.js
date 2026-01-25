const { chromium } = require("playwright");

(async () => {
  console.log("Starting Playwright test...");
  try {
    const browser = await chromium.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'] // Recommended for Docker
    });
    const page = await browser.newPage();
    
    console.log("Navigating to google.com...");
    await page.goto("https://www.google.com");
    
    const title = await page.title();
    console.log(`Page title: ${title}`);
    
    if (!title.includes("Google")) {
        throw new Error(`Unexpected title: ${title}`);
    }

    await browser.close();
    console.log("Test passed successfully!");
  } catch (e) {
    console.error("Test failed:", e);
    process.exit(1);
  }
})();
