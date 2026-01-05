import { z } from "zod";

export const regionalSettingsSchema = z.object({
    useGlobalSettings: z.boolean().optional(),
    regionalOrganizationName: z.string().optional(),
    regionalContactEmail: z.string().email("Invalid email address").optional().or(z.literal("")),
    regionalContactNumber: z.string().min(10, "Invalid contact number").max(15, "Invalid contact number").optional(),
    timezone: z.string().optional(),
    dateFormat: z.string().optional(),
    currency: z.string().optional()
}).strict();

export type RegionalSettingsInput = z.infer<typeof regionalSettingsSchema>;
