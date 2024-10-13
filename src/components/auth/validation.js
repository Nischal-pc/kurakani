import { z } from "zod";

export const loginSchema = z.object({
  email: z
    .string()
    .min(3, "Username must be at least 3 characters long")
    .max(50, "Username must be at most 20 characters long"),
    
  password: z
    .string()
    .min(6, "Password must be at least 6 characters long"), // Corrected message
});
