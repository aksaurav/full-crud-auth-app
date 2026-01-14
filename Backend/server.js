import dotenv from "dotenv";
dotenv.config();
import express from "express";
import cors from "cors";

const app = express();
const PORT = process.env.PORT || 8000;

// Middlewares
app.use(cors());
app.use(express.json());

// Mongo DB connections
import connectDB from "./Config/db.js";
connectDB();

// User routes
import userRoutes from "./Routes/userRoutes.js";
app.use("/api/auth", userRoutes);

app.listen(PORT, () => {
  console.log(`Server has started on PORT: ${PORT}`);
});
