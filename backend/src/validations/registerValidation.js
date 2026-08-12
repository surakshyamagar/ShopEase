import {z} from "zod";

const registerSchema = z.object({
    name: z
    .string()
    .trim()
    .min(2, "Name must be at least 2 characters")
    .max(50, "Name cannot exceed 50 characters"),

    email: z
    .email("Invalid email address")
    .trim()
    .toLowerCase()
    .refine(
      (email) => email.endsWith("@gmail.com"),
      "Only gmail addresses are allowed"
    ),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters")
    .max(100, "Password cannot exceed 100 characters"),
});

export default registerSchema;
