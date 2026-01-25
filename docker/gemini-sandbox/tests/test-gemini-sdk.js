const { GoogleGenerativeAI } = require("@google/generative-ai");

(async () => {
  console.log("Testing @google/generative-ai SDK loading...");
  try {
    // Check if the class is defined
    if (typeof GoogleGenerativeAI !== 'function') {
      throw new Error("GoogleGenerativeAI is not exported correctly.");
    }
    console.log("GoogleGenerativeAI class loaded successfully.");

    // Optional: Check if we can instantiate it (even without a valid key, it should instantiate)
    const genAI = new GoogleGenerativeAI("dummy-key");
    const model = genAI.getGenerativeModel({ model: "gemini-pro" });
    
    if (!model) {
        throw new Error("Failed to instantiate GenerativeModel.");
    }
    console.log("GenerativeModel instantiated successfully.");

    console.log("Gemini SDK test passed!");
  } catch (e) {
    console.error("Gemini SDK test failed:", e);
    process.exit(1);
  }
})();
