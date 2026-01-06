import { model, Schema } from "mongoose";

const regionalSettingsSchema = new Schema({
    regionId: {
        type: Schema.Types.ObjectId,
        ref: "organization_region",
        required: true,
        unique: true
    },
    useGlobalSettings: {
        type: Boolean,
        default: false
    },
    regionalOrganizationName: {
        type: String,
        trim: true
    },
    regionalContactEmail: {
        type: String,
        trim: true,
        lowercase: true
    },
    regionalContactNumber: {
        type: String,
        trim: true
    },
    timezone: {
        type: String,
        default: "UTC (GMT+0)"
    },
    dateFormat: {
        type: String,
        default: "DD/MM/YYYY"
    },
    currency: {
        type: String,
        default: "USD ($)"
    }
}, {
    timestamps: true
});

// Ensure unique settings per region for an organization
regionalSettingsSchema.index({ organizationId: 1, regionId: 1 }, { unique: true });

export const RegionalSettingsModel = model("regional_settings", regionalSettingsSchema);
