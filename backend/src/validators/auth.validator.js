import z from "zod";

export const LoginUserSchema = z.object({
  email: z.string().trim().email("Please enter a valid email address"),

  password: z
    .string()
    .trim()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password is too long")
    .refine((val) => /[A-Z]/.test(val), "Include at least one uppercase letter")
    .refine((val) => /[a-z]/.test(val), "Include at least one lowercase letter")
    .refine((val) => /[0-9]/.test(val), "Include at least one number")
    .refine(
      (val) => /[^a-zA-Z0-9]/.test(val),
      "Include at least one special character",
    ),
});

export const registerUserSchema = LoginUserSchema.extend({
  name: z
    .string()
    .trim()
    .regex(/^[a-zA-Z\s]+$/, "Name can only contain characters")
    .min(2, "Name should be at least 2 characters")
    .max(50, "Name should be less than 50 characters"),
});
