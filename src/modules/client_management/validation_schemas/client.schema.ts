import { z } from "zod";

export const clientSchema = z.object({
    companyName: z.string().min(1, "Company name is required"),
    industry: z.string().optional(),
    status: z.enum(["Active", "Inactive"]).optional(),
    website: z.string().url("Invalid URL").optional().or(z.literal("")),
    location: z.string().optional(),
    contactPerson: z.string().optional(),
    email: z.string().email("Invalid email address").optional().or(z.literal("")),
    phone: z.string().optional(),
});
