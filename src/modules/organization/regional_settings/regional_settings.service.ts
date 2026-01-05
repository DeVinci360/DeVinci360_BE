import { regionalSettingsRepository } from "./regional_settings.repository";
import { AppError } from "../../../common/errors/app.error";

class RegionalSettingsService {
    private async resolveRegionCode(regionCode: string) {
        const regionId = await regionalSettingsRepository.checkRegionExistsByCode(regionCode);
        if (!regionId) {
            throw new AppError("Region not found", 404);
        }
        return regionId?._id?.toString();
    }

    async updateSettings(regionCode: string, data: any) {
        const regionId = await this.resolveRegionCode(regionCode);
        return await regionalSettingsRepository.upsertSettings(regionId, data);
    }

    async getSettings(regionCode: string) {
        const regionId = await this.resolveRegionCode(regionCode);
        return await regionalSettingsRepository.getSettings(regionId);
    }
}

export const regionalSettingsService = new RegionalSettingsService();
