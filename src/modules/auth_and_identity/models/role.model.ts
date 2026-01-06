import { model, Schema } from "mongoose";

const roleSchema = new Schema({
    name: { type: String, required: true, unique: true },
    color: { type: String, required: true },
    categoryId: { type: Schema.Types.ObjectId, ref: "role_category" },
    description: { type: String },
    permissions: [{ type: String }],
    isActive: { type: Boolean, default: true },
}, {
    timestamps: true
});

export const RoleModel = model("role", roleSchema);
