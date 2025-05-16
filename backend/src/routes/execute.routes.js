import express from "express"
import { authenticate } from "../middleware/auth.middleware.js";
import { executeCode } from "../controllers/execute.controllers.js";

const executionRoute = express.Router();

executionRoute.post("/", authenticate, executeCode)

export default executionRoute;