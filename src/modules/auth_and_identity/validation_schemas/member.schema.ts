import { z } from "zod";
import { validateId } from "../../organization_and_policy/utils";

export const memberSchema = z.object({
    firstName: z.string().min(1, "First name is required"),
    lastName: z.string().min(1, "Last name is required"),
    email: z.string().email("Invalid email address"),
    roleId: z.string().refine((val) => validateId(val, "Invalid role ID"), { message: "Invalid role ID" }),
    status: z.enum(["Active", "Inactive", "Invited"]).optional(),
    reportingMemberId: z.string().optional().nullable().refine((val) => !val || validateId(val, "Invalid manager ID"), { message: "Invalid manager ID" }),
    address: z.string().optional(),
    phone: z.string().optional(),
    startDate: z.string().or(z.date()).optional(),
    emergencyContactName: z.string().optional(),
    emergencyContactPhone: z.string().optional(),
});
