import { z } from "zod";
import mongoose from "mongoose";

export const roleSchema = z.object({
    name: z.string().min(1, "Name is required"),
    color: z.string().min(1, "Color is required"),
    categoryId: z.string().optional().refine((val) => !val || mongoose.Types.ObjectId.isValid(val), "Invalid category ID"),
    description: z.string().optional(),
    permissions: z.array(z.string()).optional(),
    isActive: z.boolean().optional().default(true)
});

export type RoleInput = z.infer<typeof roleSchema>;
