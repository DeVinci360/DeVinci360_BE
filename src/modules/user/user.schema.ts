import { z } from "zod";

export const registerUserSchema = z.object({
    email: z.email("Invalid email"),
    password: z.string().min(8, "Password must be at least 8 characters"),
}).strict();

export const loginUserSchema = z.object({
    email: z.email("Invalid credentials!!"),
    password: z.string("Invalid credentials!!"),
}).strict();

export type RegisterUserInput = z.infer<typeof registerUserSchema>;
