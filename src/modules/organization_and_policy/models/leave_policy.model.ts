import { model, Schema } from "mongoose";

const leaveTypeSchema = new Schema({
    name: { type: String, required: true },
    annualAllowance: { type: Number, required: true, min: 0 },
    minNoticeDays: { type: Number, default: 0, min: 0 },
    isSpecial: { type: Boolean, default: false },
    carryForward: { type: Boolean, default: false },
    carryForwardDays: { type: Number, default: 0, min: 0 },
    description: { type: String },
});

const leavePolicySchema = new Schema({
    regionId: {
        type: Schema.Types.ObjectId,
        ref: "organization_region",
        required: true,
        unique: true
    },
    leaveTypes: [leaveTypeSchema]
}, {
    timestamps: true
});

leavePolicySchema.index({ regionId: 1 }, { unique: true });

export const LeavePolicyModel = model("leave_policy", leavePolicySchema);
