import axios from "axios";

export const handlePortfolioChat = async (req, res) => {
  try {
    const { question } = req.body;

    if (!question) {
      return res.status(400).json({ error: "Question is required" });
    }

    if (!process.env.OPEN_ROUTER_API) {
      return res.status(500).json({ error: "Missing OpenRouter API key" });
    }

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

    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "google/gemini-2.0-flash-lite-preview-02-05:free",
        messages: [
          { role: "system", content: PROJECT_CONTEXT },
          { role: "user", content: question },
        ],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPEN_ROUTER_API}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://full-crud-auth.vercel.app",
          "X-Title": "Portfolio AI",
        },
      },
    );

    const reply = response.data.choices[0].message.content;

    res.json({ reply });
  } catch (error) {
    console.error(
      "❌ OpenRouter Error:",
      error.response?.data || error.message,
    );
    res.status(500).json({ error: "AI is currently offline" });
  }
};
