import express from "express";
import {
  handleLaunchMission,
  handleGetMission,
  handleUpdateMission,
  handleDeleteMission,
} from "../Controllers/missionController.js";
import { protect } from "../Middlewares/authMiddleware.js";

const router = express.Router();

// Apply protect middle to all mission routes
router.post("/launch", protect, handleLaunchMission);
router.get("/:id", protect, handleGetMission);
router.get("/update/:id", protect, handleUpdateMission);
router.get("/abort/:id", protect, handleDeleteMission);

export default router;
