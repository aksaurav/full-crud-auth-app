import axios from "axios";

export const handlePortfolioChat = async (req, res) => {
  // 1. Define the Identity (System Context)
  const PROJECT_CONTEXT = `
    You are Saurav's AI assistant.
    Answer questions about his MERN project called Mission Control.
    Mention:
    • JWT authentication
    • HTTP-only cookies
    • MongoDB Atlas
    • CORS + Render cold start challenges
    Be concise and professional.
  `;

  try {
    // Check if the frontend is sending 'message' or 'question'
    const userMessage = req.body.message || req.body.question;

    if (!userMessage) {
      return res.status(400).json({ error: "No message provided" });
    }

    // 2. The API Call to Groq
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system", // This tells the AI its identity
            content: PROJECT_CONTEXT,
          },
          {
            role: "user", // This is what the visitor typed
            content: userMessage,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          // IMPORTANT: Ensure GROQ_API_KEY is set in Render Environment Variables
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
          "Content-Type": "application/json",
        },
      },
    );

    // 3. Send back only the text content
    const aiReply = response.data.choices[0].message.content;
    res.json({ reply: aiReply });
  } catch (err) {
    // This logs the EXACT reason for the 500 error in your Render dashboard
    console.error("GROQ ERROR LOG:");
    console.error(err.response?.data || err.message);

    res.status(500).json({
      error: "AI error",
      details: err.response?.data?.error?.message || err.message,
    });
  }
};
