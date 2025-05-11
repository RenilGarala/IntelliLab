import express from "express";
import { createProblem, deleteProblem, getAllProblem, getAllProblemsSolvedByUser, getProblemById, updateProblem } from "../controllers/problem.controllers.js";
import { authenticate, checkAdmin } from "../middleware/auth.middleware.js";

const problemRoutes = express.Router();

problemRoutes.post('/create-problem', authenticate, checkAdmin, createProblem);

problemRoutes.get('/get-all-problem', authenticate, getAllProblem);

problemRoutes.get("/get-problem/:id", authenticate, getProblemById);

problemRoutes.put("/update-problem/:id", authenticate, checkAdmin, updateProblem);

problemRoutes.delete("/delete-problem/:id", authenticate, checkAdmin, deleteProblem);

problemRoutes.get("/get-solved-problem" , authenticate , getAllProblemsSolvedByUser)

export default problemRoutes;