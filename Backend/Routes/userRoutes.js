import express from "express";
const route = express.Router();
import { handleSignUp, handleLogin } from "../Controllers/userController.js";

route.post("/signup", handleSignUp);
route.post("/login", handleLogin);

export default route;
