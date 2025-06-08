import { ZodSchema } from "zod";

export const validate =
  (schema, location = "body") =>
  (req, res, next) => {
    const result = schema.safeParse(req[location]);
    if (!result.success) {
      return res.status(400).json({
        success: false,
        errors: result.error.flatten().fieldErrors,
      });
    }
    req[location] = result.data;
    next();
  };
