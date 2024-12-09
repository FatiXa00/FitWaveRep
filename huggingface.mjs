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
//     const response = await fetch('https://api-inference.huggingface.co/models/microsoft/LLM2CLIP-Openai-L-14-336', {
//       method: 'POST',
//       headers: {
//         'Authorization': `Bearer ${process.env.HUGGINGFACE_API_KEY}`,
//         'Content-Type': 'application/json',
//       },
//       body: JSON.stringify({
//         inputs: userMessage,  // Text input
//       }),
//     });

//     const data = await response.json();

//     // Log the response for debugging
//     console.log('Hugging Face API Response:', data);

//     // Handle response
//     if (data.error) {
//       return { message: `Error: ${data.error}` };
//     }

//     // If the model provides valid output, return it
//     if (data.generated_text) {
//       return { message: data.generated_text };
//     }

//     return { message: "Sorry, I didn't understand that." };
//   } catch (error) {
//     console.error('Error:', error);
//     return { message: "There was an error processing your request." };
//   }
// }

// // Define your API route
// app.post('/chat', async (req, res) => {
//   const userMessage = req.body.message;

//   // If no message is provided in the request body
//   if (!userMessage) {
//     return res.status(400).send({ message: "No message provided" });
//   }

//   // Pass the user's message to the handleChat function
//   const chatResponse = await handleChat(userMessage);

//   // Send the response back to the client
//   res.send(chatResponse);
// });

// // Start the server
// app.listen(port, () => {
//   console.log(`Server running at http://localhost:${port}`);
// });
