import { RegionalSettingsModel } from "./regional_settings.model";
import { OrganizationRegionModel } from "../organization_region/org_region.model";

class RegionalSettingsRepository {
    async checkRegionExists(regionId: string) {
        return await OrganizationRegionModel.exists({ _id: regionId });
    }

    async upsertSettings(regionId: string, data: any) {
        return await RegionalSettingsModel.findOneAndUpdate(
            { regionId },
            { $set: { ...data, regionId } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
    }

    async getSettings(regionId: string) {
        return await RegionalSettingsModel.findOne({ regionId });
    }
}

export const regionalSettingsRepository = new RegionalSettingsRepository();
