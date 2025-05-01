import express from "express";
import { createProblem } from "../controllers/problem.controllers.js";

const problemRoutes = express.Router();

problemRoutes.post('/create-problem',createProblem);

export default problemRoutes;