import { z } from "zod";

const sheetFieldsValidator = z.object({
  title: z.string().trim().min(1, "Title is required"),
  company: z.string().trim().min(1, "Company is required"),
  description: z
    .string()
    .trim()
    .max(200, "Description can not be more than 200 chars"),
});

const sheetIdParamsValidator = z.object({
  sheetId: z
    .string()
    .trim()
    .uuid("Invalid sheet Id")
    .min(1, "Sheet id is required"),
});

const updatedSheetValidator = sheetFieldsValidator.merge(
  sheetIdParamsValidator,
);

const sheetProblemsValidator = z.object({
  sheetId: z
    .string()
    .trim()
    .uuid("Invalid sheet Id")
    .min(1, "Sheet id is required"),
  problemIds: z
    .array(z.any())
    .min(1, "ProblemIds array should contain at least 1 value"),
});

const problemIdsValidator = z.object({
  problemIds: z
    .array(z.any())
    .min(1, "ProblemIds array should contain at least 1 value"),
});

export {
  sheetFieldsValidator,
  sheetIdParamsValidator,
  updatedSheetValidator,
  sheetProblemsValidator,
  problemIdsValidator,
};
