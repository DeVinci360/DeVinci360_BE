import { Response } from "express";
import { AuthenticatedRequest } from "../../../common/types";
import { regionalSettingsService } from "../services/regional_settings.service";

class RegionalSettingsController {
    async updateSettings(req: AuthenticatedRequest, res: Response) {
        try {
            const { regionCode } = req.params;
            const settings = await regionalSettingsService.updateSettings(
                regionCode,
                req.body
            );
            return res.status(200).json({
                message: "Regional settings updated successfully",
                data: settings,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 500).json({
                message: error?.message || "Failed to update regional settings",
                error: true,
            });
        }
    }

    async getSettings(req: AuthenticatedRequest, res: Response) {
        try {
            const { regionCode } = req.params;
            const settings = await regionalSettingsService.getSettings(regionCode);
            return res.status(200).json({
                message: "Success",
                data: settings || {},
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 500).json({
                message: error?.message || "Failed to fetch regional settings",
                error: true,
            });
        }
    }
}

export const regionalSettingsController = new RegionalSettingsController();
