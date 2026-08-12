import {z} from "zod";

// get object function from zod
// and expects the incoming data to be a JavaScript object with specific keys (name, email, password)
const loginSchema = z.object({
    email: z
        .email("Invalid email address")
        .trim()
        .toLowerCase(),

    password: z
        .string()
        .min(6, "Password must be at least 6 characters")
        .max(100, "Password cannot exceed 100 characters"),
});

export default loginSchema;