import express from "express"
import { checkAuth, getSubmissions, login, logout, register } from "../controllers/auth.controllers.js";
import { authenticate } from "../middleware/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

authRoutes.post("/logout", authenticate, logout);

authRoutes.get("/check", authenticate, checkAuth);

authRoutes.get("/get-submissions",authenticate , getSubmissions);

export default authRoutes;