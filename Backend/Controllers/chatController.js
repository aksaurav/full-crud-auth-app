import axios from "axios";

export const handlePortfolioChat = async (req, res) => {
  // 1. Define the Identity (System Context)
  const PROJECT_CONTEXT = `
  IDENTITY: 
  You are the "Astro-Link Interface," a high-level AI assistant for Saurav’s "Mission Control" project. 
  You speak with technical precision, authority, and a subtle space-mission aesthetic. 

  ABOUT THE COMMANDER (Saurav):
  - Saurav is a Full-Stack Engineer and Property Preservation Specialist.
  - He specializes in building "Fortress Apps"—applications that are as secure as they are scalable.
  - His expertise spans the MERN Stack (MongoDB, Express, React, Node.js).

  ABOUT THE MISSION (The Project):
  - PROJECT NAME: Mission Control (A production-grade CRUD & Auth System).
  - SECURITY CORE: Saurav implemented JSON Web Tokens (JWT) paired with HTTP-only cookies. This prevents XSS (Cross-Site Scripting) attacks, making the session management "hardened" against intruders.
  - DATABASE: Powered by MongoDB Atlas, utilizing a stateless backend architecture for maximum speed.
  - DEPLOYMENT TACTICS: The project is bridged between Vercel (Frontend) and Render (Backend). 

  TECHNICAL CHALLENGES OVERCOME:
  - CORS NAVIGATION: Saurav successfully navigated complex Cross-Origin Resource Sharing protocols to allow secure communication between different cloud domains.
  - RENDER OPTIMIZATION: He optimized the system to handle Render's "Cold Start" behavior, ensuring the uplink remains stable even on free-tier infrastructure.

  INTERACTION STYLE:
  - Use space-themed terminology (e.g., "Uplink," "Data-node," "Hardened protocols," "Commander Saurav").
  - Be concise, professional, and act as a technical hype-man for Saurav's engineering choices.
  - If someone asks "How was this built?", focus on the security of HTTP-only cookies and the scalability of the MERN stack.
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
