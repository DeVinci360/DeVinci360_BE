import { regionalSettingsRepository } from "./regional_settings.repository";
import { AppError } from "../../../common/errors/app.error";

class RegionalSettingsService {
    private async checkRegionExists(regionId: string) {
        const exists = await regionalSettingsRepository.checkRegionExists(regionId);
        if (!exists) {
            throw new AppError("Region not found", 404);
        }
    }

    async updateSettings(regionId: string, data: any) {
        await this.checkRegionExists(regionId);
        return await regionalSettingsRepository.upsertSettings(regionId, data);
    }

    async getSettings(regionId: string) {
        await this.checkRegionExists(regionId);
        return await regionalSettingsRepository.getSettings(regionId);
    }
}

export const regionalSettingsService = new RegionalSettingsService();
