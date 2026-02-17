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
    const userMessage = req.body.message || req.body.question;

    if (!userMessage) {
      return res.status(400).json({ error: "No message provided" });
    }

    // 2. PRE-FLIGHT CHECK: Ensure API key exists and is clean
    const rawKey = process.env.GROQ_API_KEY;

    if (!rawKey) {
      console.error(
        "GROQ ERROR: API Key is missing from environment variables.",
      );
      return res
        .status(500)
        .json({ error: "Server Configuration Error: Missing Key" });
    }

    // Trim whitespace to prevent 'Invalid API Key' errors due to accidental spaces
    const cleanKey = rawKey.trim();

    // 3. The API Call to Groq
    const response = await axios.post(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        model: "llama-3.1-8b-instant",
        messages: [
          {
            role: "system",
            content: PROJECT_CONTEXT,
          },
          {
            role: "user",
            content: userMessage,
          },
        ],
        temperature: 0.7,
        max_tokens: 500,
      },
      {
        headers: {
          // Using the cleaned key here
          Authorization: `Bearer ${cleanKey}`,
          "Content-Type": "application/json",
        },
      },
    );

    // 4. Send back the reply
    if (response.data && response.data.choices && response.data.choices[0]) {
      const aiReply = response.data.choices[0].message.content;
      return res.json({ reply: aiReply });
    } else {
      throw new Error("Unexpected response format from Groq");
    }
  } catch (err) {
    // This will print the specific reason in Render logs
    console.error("GROQ_FAILURE_REPORT:");
    console.error(err.response?.data || err.message);

    res.status(500).json({
      error: "AI error",
      details: err.response?.data?.error?.message || err.message,
    });
  }
};
