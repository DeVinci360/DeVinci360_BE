import { RegionalSettingsModel } from "../models/regional_settings.model";

class RegionalSettingsRepository {

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
