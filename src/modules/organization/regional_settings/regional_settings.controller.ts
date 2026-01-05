import { Response } from "express";
import { AuthenticatedRequest } from "../../../common/types";
import { regionalSettingsService } from "./regional_settings.service";
import { checkRegionId } from "./regional_settings.utils";

class RegionalSettingsController {
    async updateSettings(req: AuthenticatedRequest, res: Response) {
        try {
            const { regionId } = req.params;
            checkRegionId(regionId);
            const settings = await regionalSettingsService.updateSettings(
                regionId,
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
            const { regionId } = req.params;
            checkRegionId(regionId);
            const settings = await regionalSettingsService.getSettings(regionId);
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
