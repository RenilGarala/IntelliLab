import express from "express";
import { authenticate } from "../middleware/auth.middleware.js";
import { getAllSubmission, getAllSubmissionForProblem, getSubmissionForProblem } from "../controllers/submission.controllers.js";

const submissionRoute = express.Router();

submissionRoute.get("/get-all-submission", authenticate, getAllSubmission);
submissionRoute.get("/get-submission/:problemId", authenticate, getSubmissionForProblem);
submissionRoute.get("/get-submissions-count/:problemId", authenticate, getAllSubmissionForProblem);

export default submissionRoute;