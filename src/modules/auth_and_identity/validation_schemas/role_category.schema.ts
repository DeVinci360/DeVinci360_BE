import { z } from "zod";

export const roleCategorySchema = z.object({
    name: z.string().min(1, "Name is required").trim(),
    isActive: z.boolean().optional().default(true)
});

export type RoleCategoryInput = z.infer<typeof roleCategorySchema>;
