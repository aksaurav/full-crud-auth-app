import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

const allowedOrigins = [
  "http://localhost:5173",
  "https://mern-crud-auth-app.onrender.com",
  "https://full-crud-auth-aksauravs-projects.vercel.app",
  "https://full-crud-auth.vercel.app",
];

app.use(
  cors({
    origin: function (origin, callback) {
      // Allow requests with no origin (like mobile apps)
      if (!origin) return callback(null, true);

      // Check if the origin is in the whitelist OR is a Vercel preview URL
      const isVercelPreview = origin.endsWith(".vercel.app");

      if (allowedOrigins.indexOf(origin) !== -1 || isVercelPreview) {
        callback(null, true);
      } else {
        callback(new Error("CORS policy blocked this origin."), false);
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);
app.use(express.json());

// Mongo DB connections
import connectDB from "./Config/db.js";
connectDB();

// User routes
import userRoutes from "./Routes/userRoutes.js";
app.use("/api/auth", userRoutes);

// Mission routes
import mission from "./Routes/missionRoutes.js";
app.use("/api/mission", mission);

// Chat Route
import chatBot from "./Routes/chat.js";
app.use("/api/chat", chatBot);

app.listen(PORT, () => {
  console.log(`Server has started on PORT: ${PORT}`);
});
