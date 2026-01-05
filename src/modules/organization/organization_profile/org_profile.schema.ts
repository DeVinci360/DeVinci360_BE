import { z } from "zod";

export const organizationProfileSchema = z.object({
    organizationName: z.string("Organization name is required").min(3, "Organization name must be at least 3 characters long"),
    contactEmail: z.email("Invalid email address").max(100, "Email must be at most 100 characters long"),
    website: z.url("Invalid website URL").optional().or(z.literal("")),
    contactNumber: z.string("Contact number is required").min(10, "Contact number must be at least 10 digits"),
    description: z.string().max(500, "Description must be at most 500 characters long").optional(),
    isActive: z.boolean().optional().default(true)
}).strict();

export const updateOrgProfileSchema = organizationProfileSchema.partial();
