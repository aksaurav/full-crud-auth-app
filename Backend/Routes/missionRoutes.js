import express from "express";
import {
  handleLaunchMission,
  handleGetMission,
  handleUpdateMission,
  handleGetMissionById,
  handleDeleteMission,
} from "../Controllers/missionController.js";
import { protect } from "../Middlewares/authMiddleware.js";

const router = express.Router();

// Apply protect middle to all mission routes

// Create New Mission
router.post("/launch", protect, handleLaunchMission);

// Get all missions for the logged-in user
router.get("/", protect, handleGetMission);

// Get a specific mission by ID
router.get("/:id", protect, handleGetMissionById);

// Update a mission
router.put("/update/:id", protect, handleUpdateMission);

// Delete a mission
router.delete("/abort/:id", protect, handleDeleteMission);

export default router;
