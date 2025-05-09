import express from "express";
import { createProblem } from "../controllers/problem.controllers.js";
import { authenticate } from "../middleware/auth.middleware.js";

const problemRoutes = express.Router();

problemRoutes.post('/create-problem', authenticate, createProblem);

export default problemRoutes;