import express from "express";
import {
  problemIdsValidator,
  sheetFieldsValidator,
  sheetIdParamsValidator,
  sheetProblemsValidator,
  updatedSheetValidator,
} from "../validators/sheet.validator.js";
import { authenticate, checkAdmin } from "../middleware/auth.middleware.js";
import {
  addProblemInSheet,
  createSheet,
  deleteSheet,
  getAllSheets,
  getSheetById,
  removeProblemFromSheet,
  updateSheet,
} from "../controllers/sheet.controllers.js";
import { validate } from "../middleware/sheet.middleware.js";

const sheetRoutes = express.Router();

sheetRoutes.post(
  "/create-sheet",
  authenticate,
  checkAdmin,
  validate(sheetFieldsValidator),
  createSheet,
);

sheetRoutes.get("/", authenticate, getAllSheets);

sheetRoutes.get(
  "/:sheetId",
  authenticate,
  validate(sheetIdParamsValidator, "params"),
  getSheetById,
);

sheetRoutes.patch(
  "/update-sheet/:sheetId",
  authenticate,
  checkAdmin,
  validate(sheetIdParamsValidator, "params"),
  validate(sheetFieldsValidator, "body"),
  updateSheet,
);

sheetRoutes.post(
  "/:sheetId/add-problem",
  authenticate,
  checkAdmin,
  validate(sheetIdParamsValidator, "params"),
  validate(problemIdsValidator, "body"),
  addProblemInSheet,
);

sheetRoutes.delete(
  "/:sheetId/remove-problem",
  authenticate,
  checkAdmin,
  validate(sheetIdParamsValidator, "params"),
  validate(problemIdsValidator, "body"),
  removeProblemFromSheet,
);

sheetRoutes.delete(
  "/:sheetId",
  authenticate,
  checkAdmin,
  validate(sheetIdParamsValidator, "params"),
  deleteSheet,
);

export default sheetRoutes;
