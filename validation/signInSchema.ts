import { z } from "zod";

export const signInSchema = z.object({
  email: z
    .string()
    .email("Please enter a valid email address")
    .min(5, "Email is too short")
    .max(100, "Email cannot exceed 100 characters"),

  password: z
    .string()
    .min(8, "Password must be at least 8 characters")
    .max(100, "Password cannot exceed 100 characters"),
});

export type SignInFormData = z.infer<typeof signInSchema>;
