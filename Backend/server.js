import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

const allowedOrigins = [
  `http://localhost:5173`,
  `https://full-crud-auth-dc2c33554-aksauravs-projects.vercel.app`,
  `https://mern-crud-auth-app.onrender.com`,
];

// Middlewares
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin) return callback(null, true);
      if (allowedOrigins.indexOf(origin) === -1) {
        const msg =
          "The CORS policy for this site does not allow access from the specified Origin.";
        return callback(new Error(msg), false);
      }
      return callback(null, true);
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

app.listen(PORT, () => {
  console.log(`Server has started on PORT: ${PORT}`);
});
