// Import required packages
const { OpenAI } = require("openai");
require("dotenv").config(); // Load environment variables

// Initialize OpenAI API with your key from .env
const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
  apiBaseUrl: 'https://api.openai.com/v1', // Optional: You may need to add this for some versions
});

// Function to test the API
async function testOpenAI() {
  try {
    const response = await openai.chat.completions.create({
      model: "gpt-3.5-turbo", // Using GPT-3.5 Turbo
      messages: [{ role: "user", content: "Hello, OpenAI!" }],
    });
    console.log("Response from OpenAI:", response.choices[0].message.content);
  } catch (error) {
    console.error("Error connecting to OpenAI:", error.message);
  }
}

// Run the test
testOpenAI();
