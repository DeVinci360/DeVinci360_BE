import { Response } from "express";
import { AuthenticatedRequest } from "../../../common/types";
import { workScheduleService } from "./work_schedule.service";

class WorkScheduleController {
    async updateSchedule(req: AuthenticatedRequest, res: Response) {
        try {
            const { regionCode } = req.params;
            const schedule = await workScheduleService.updateSchedule(
                regionCode,
                req.body
            );
            return res.status(200).json({
                message: "Work schedule updated successfully",
                data: schedule,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 500).json({
                message: error?.message || "Failed to update work schedule",
                error: true,
            });
        }
    }

    async getSchedule(req: AuthenticatedRequest, res: Response) {
        try {
            const { regionCode } = req.params;
            const schedule = await workScheduleService.getSchedule(regionCode);
            return res.status(200).json({
                message: "Success",
                data: schedule || {},
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 500).json({
                message: error?.message || "Failed to fetch work schedule",
                error: true,
            });
        }
    }
}

export const workScheduleController = new WorkScheduleController();
