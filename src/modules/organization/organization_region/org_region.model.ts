import { model, Schema } from "mongoose";
import uniqueValidater from "../../../common/utils/uv";

const orgnizationRegionSchema = new Schema({
    regionName: {
        type: String,
        required: true,
        unique: [true, "Region name already exists"],
        max: [50, "Region name should be less than 50 characters"],
        min: [1, "Region name should be at least 3 characters"]
    },
    regionCode: {
        type: String,
        unique: [true, "Region code already exists"],
        // required: true,
        max: [50, "Region code should be less than 50 characters"],
        min: [1, "Region code should be at least 1 character"]
    },
    isDefault: {
        type: Boolean,
        default: false
    },
    isActive: {
        type: Boolean,
        default: true
    }
});

orgnizationRegionSchema.plugin(uniqueValidater, { message: '{PATH} already exists' });

export const OrganizationRegionModel = model("organization_region", orgnizationRegionSchema);
