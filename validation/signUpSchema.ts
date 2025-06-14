import { z } from "zod";

export const signUpSchema = z
  .object({
    name: z
      .string()
      .min(2, "Name must be at least 2 characters")
      .max(50, "Name cannot exceed 50 characters")
      .regex(/^[a-zA-Z\s]*$/, "Name can only contain letters and spaces"),

    email: z
      .string()
      .email("Please enter a valid email address")
      .min(5, "Email is too short")
      .max(100, "Email cannot exceed 100 characters"),

    password: z
      .string()
      .min(8, "Password must be at least 8 characters")
      .max(100, "Password cannot exceed 100 characters")
      .regex(
        /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]+$/,
        "Password must contain at least one uppercase letter, one lowercase letter, one number and one special character"
      ),

    confirmPassword: z.string(),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["confirmPassword"],
  });

export type SignUpFormData = z.infer<typeof signUpSchema>;
