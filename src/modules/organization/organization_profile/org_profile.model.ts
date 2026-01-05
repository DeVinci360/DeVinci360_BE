import { model, Schema } from "mongoose";

const orgnizationProfileSchema = new Schema({
    organizationName: {
        type: String,
        required: true
    },
    contactEmail: {
        type: String,
        required: true,
        lowercase: true,
    },
    website: {
        type: String,
        lowercase: true,
    },
    contactNumber: {
        type: String,
        required: true,
        maxLength: 15,
    },
    description: {
        type: String,
        maxLength: 500,
    },
    isActive: {
        type: Boolean,
        default: true
    }
}, {
    timestamps: true
});

export const OrganizationProfileModel = model("organization_profile", orgnizationProfileSchema);
