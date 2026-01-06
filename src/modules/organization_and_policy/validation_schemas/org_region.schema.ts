import { z } from "zod";

export const orgRegionSchema = z.object({
    regionName: z.string("Region name is required").min(3, "Region name should be at least 3 characters").max(50, "Region name should be less than 50 characters"),
    regionCode: z.string().optional(),
    isDefault: z.boolean().optional().default(false),
    isActive: z.boolean().optional().default(true)
}).strict();