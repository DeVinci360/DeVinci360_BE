import { z } from "zod";

const leaveTypeSchema = z.object({
    name: z.string().min(1, "Name is required"),
    annualAllowance: z.number().min(0, "Allowance must be non-negative"),
    minNoticeDays: z.number().min(0).optional().default(0),
    isSpecial: z.boolean().optional().default(false),
    carryForward: z.boolean().optional().default(false),
    carryForwardDays: z.number().min(0).optional().default(0),
    description: z.string().optional(),
});

export const leavePolicySchema = z.object({
    regionId: z.string().optional().nullable(),
    leaveTypes: z.array(leaveTypeSchema)
});

export type LeavePolicyInput = z.infer<typeof leavePolicySchema>;
