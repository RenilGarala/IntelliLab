import express from "express"
import { authenticate } from "../middleware/auth.middleware.js";
import { executeCode, runCode } from "../controllers/execute.controllers.js";

const executionRoute = express.Router();

executionRoute.post("/", authenticate, executeCode);

executionRoute.post("/run-code", authenticate, runCode);

export default executionRoute;