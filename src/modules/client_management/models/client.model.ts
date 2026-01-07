import { Schema, model } from "mongoose";

const clientSchema = new Schema({
    companyName: { type: String, required: true, trim: true },
    industry: { type: String, trim: true },
    status: {
        type: String,
        enum: ["Active", "Inactive"],
        default: "Active"
    },
    website: { type: String, trim: true },
    location: { type: String, trim: true },
    contactPerson: { type: String, trim: true },
    email: { type: String, trim: true, lowercase: true },
    phone: { type: String, trim: true },
}, {
    timestamps: true
});

export const ClientModel = model("Client", clientSchema);
