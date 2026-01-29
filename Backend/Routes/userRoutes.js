import express from "express";
const route = express.Router();
import {
  handleSignUp,
  handleLogin,
  handleGetUserById,
} from "../Controllers/userController.js";

route.post("/signup", handleSignUp);
route.post("/login", handleLogin);
route.get("/:id", handleGetUserById);

export default route;
