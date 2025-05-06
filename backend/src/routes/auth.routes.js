import express from "express"
import { checkAuth, login, logout, register } from "../controllers/auth.controllers.js";
import { authMiddleware } from "../middleware/auth.middleware.js";

const authRoutes = express.Router();

authRoutes.post("/register", register);

authRoutes.post("/login", login);

authRoutes.post("/logout", authMiddleware, logout);

authRoutes.post("/check", authMiddleware, checkAuth);

export default authRoutes;