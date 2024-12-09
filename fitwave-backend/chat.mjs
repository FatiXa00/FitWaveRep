// import express from 'express';
// import fetch from 'node-fetch';
// import dotenv from 'dotenv';

// // Load environment variables from .env file
// dotenv.config();

// const app = express();
// const port = 3000;

// app.use(express.json()); // This middleware parses JSON request bodies

// // Define a function to handle the chat message
// async function handleChat(userMessage) {
//   try {
//     const response = await fetch('https://api-inference.huggingface.co/models/openai-community/gpt2', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`, // API Key from .env
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         inputs: userMessage, // Input from the user
//       }),
//     });

//     const data = await response.json();

//     // Log the full response to check the returned data
//     console.log('Hugging Face API Response:', data);

//     // Check if model response contains valid generated text
//     if (data.generated_text) {
//       return data.generated_text; // Return generated text from the model
//     } else {
//       return "Sorry, I didn't understand that."; // Handle case where no valid response is generated
//     }
//   } catch (error) {
//     console.error('Error:', error);
//     return "There was an error processing your request.";
//   }
// }

// // Define your API route
// app.post('/chat', async (req, res) => {
//   console.log('Received body:', req.body);  // Log the request body to ensure it's parsed properly
//   const userMessage = req.body.message;

//   // If no message is provided in the request body
//   if (!userMessage) {
//     return res.status(400).send({ message: "No message provided" });
//   }

//   // Pass the user's message to the handleChat function
//   const chatResponse = await handleChat(userMessage);

//   // Send the response back to the client
//   res.send({ message: chatResponse });
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
