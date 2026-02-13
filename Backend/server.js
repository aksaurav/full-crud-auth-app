import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

console.log("🚀 Server starting...");
console.log("API KEY EXISTS?", !!process.env.OPEN_ROUTER_API);

// =============================
// 1️⃣ CORS CONFIG (FIXED)
// =============================
const allowedOrigins = [
  "http://localhost:5173",
  "http://127.0.0.1:5173", // ⭐ IMPORTANT (Vite sometimes uses this)
  "https://mern-crud-auth-app.onrender.com",
  "https://full-crud-auth-aksauravs-projects.vercel.app",
  "https://full-crud-auth.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      console.log("🌐 Request from origin:", origin);

      // allow requests like Postman / mobile apps
      if (!origin) return callback(null, true);

      const isVercelPreview = origin.endsWith(".vercel.app");

      if (allowedOrigins.includes(origin) || isVercelPreview) {
        callback(null, true);
      } else {
        callback(new Error("❌ CORS policy blocked this origin: " + origin));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

// =============================
// 2️⃣ BODY PARSERS (IMPORTANT)
// =============================
app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true }));

// =============================
// 3️⃣ DATABASE CONNECTION
// =============================
import connectDB from "./Config/db.js";
connectDB();

// =============================
// 4️⃣ ROUTES
// =============================

// Auth routes
import userRoutes from "./Routes/userRoutes.js";
app.use("/api/auth", userRoutes);

// Mission routes
import missionRoutes from "./Routes/missionRoutes.js";
app.use("/api/mission", missionRoutes);

// 🤖 AI Chat route
import chatRoutes from "./Routes/chat.js"; // make sure filename = chat.js
app.use("/api/chat", chatRoutes);

// =============================
// 5️⃣ HEALTH CHECK ROUTE
// =============================
app.get("/", (req, res) => {
  res.send("API is running...");
});

// =============================
// 6️⃣ GLOBAL ERROR HANDLER ⭐
// =============================
app.use((err, req, res, next) => {
  console.error("🔥 GLOBAL ERROR:", err.message);
  res.status(500).json({
    success: false,
    error: err.message || "Server Error",
  });
});

// =============================
// 7️⃣ START SERVER
// =============================
app.listen(PORT, () => {
  console.log(`✅ Server running on port ${PORT}`);
});
