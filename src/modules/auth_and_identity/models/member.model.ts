import { Schema, model, Types } from "mongoose";

const memberSchema = new Schema({
    firstName: { type: String, required: true, trim: true },
    lastName: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    roleId: { type: Types.ObjectId, ref: "Role", required: true },
    status: {
        type: String,
        enum: ["Active", "Inactive", "Invited"],
        default: "Invited"
    },
    reportingMemberId: { type: Types.ObjectId, ref: "Member", default: null },
    address: { type: String },
    phone: { type: String },
    startDate: { type: Date },
    emergencyContactName: { type: String },
    emergencyContactPhone: { type: String },
}, {
    timestamps: true
});

export const MemberModel = model("Member", memberSchema);
