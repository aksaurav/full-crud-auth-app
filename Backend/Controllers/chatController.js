import axios from "axios";
import dotenv from "dotenv";
dotenv.config();

// 1. The knowledge base
const PROJECT_CONTEXT = `
  You are the AI Assistant for Saurav's Portfolio Project called "Mission Control".
  
  ABOUT THE CREATOR (Saurav):
  - Role: Full Stack Developer & Property Preservation Specialist.
  - Skills: MERN Stack (MongoDB, Express, React, Node.js), Secure Authentication, API Deployment.
  - Focus: Building scalable, secure web applications with real-world utility.
  
  ABOUT THIS PROJECT (Mission Control - CRUD & Auth System):
  - Purpose: A production-grade User Management System designed to handle secure authentication and data operations.
  - Tech Stack: 
      * Frontend: React (Vite) + Tailwind CSS + Framer Motion.
      * Backend: Node.js + Express.
      * Database: MongoDB (Atlas).
  - Key Features:
      * Secure Authentication: Implemented JSON Web Tokens (JWT) and HTTP-only cookies for session management.
      * Security: Uses 'bcryptjs' for password hashing and 'dotenv' for environment variable protection.
      * Architecture: RESTful API design with a stateless backend architecture.
      * Deployment: Solved complex Cross-Origin Resource Sharing (CORS) challenges to link Vercel (Frontend) with Render (Backend).
  
  YOUR GOAL:
  Answer questions about how Saurav built this.
  If asked about challenges, mention the CORS configuration and Render's "Cold Start" issues that Saurav optimized.
  Be professional, concise, and act as a technical advocate for Saurav.
`;

export const handlePortfolioChat = async (req, res) => {
  const { question } = req.body;

  try {
    const response = await axios.post(
      `https://openrouter.ai/api/v1/chat/completions`,
      {
        model: `minimax/minimax-m2.5`,
        message: [
          { role: "system", content: PROJECT_CONTEXT },
          { role: "user", content: question },
        ],
      },
      {
        headers: {
          Authorization: `Bearer${process.env.OPEN_ROUTER_API}`,
          "Content-Type": "application/json",
        },
      },
    );

    const reply = response.data.choices[0].message.content;
    res.json({ reply });
  } catch (error) {
    console.error("Chat Error:", error);
    res.status(500).json({ error: "I'm having trouble thinking right now." });
  }
};
