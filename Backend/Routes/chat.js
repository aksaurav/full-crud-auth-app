import express from "express";
import { handlePortfolioChat } from "../Controllers/chatController.js";

const router = express.Router();

router.post("/ask-me", handlePortfolioChat);

export default router;
