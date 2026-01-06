import { model, Schema } from "mongoose";

const roleCategorySchema = new Schema({
    name: { type: String, required: true, unique: true },
    isActive: { type: Boolean, default: true }
}, {
    timestamps: true
});

export const RoleCategoryModel = model("role_category", roleCategorySchema);
