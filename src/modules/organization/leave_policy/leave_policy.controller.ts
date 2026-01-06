import { Response } from "express";
import { AuthenticatedRequest } from "../../../common/types";
import { leavePolicyService } from "./leave_policy.service";

class LeavePolicyController {
    async updatePolicy(req: AuthenticatedRequest, res: Response) {
        try {
            const { regionCode } = req.params;
            const policy = await leavePolicyService.updatePolicy(
                regionCode,
                req.body
            );
            return res.status(200).json({
                message: "Leave policy updated successfully",
                data: policy,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 500).json({
                message: error?.message || "Failed to update leave policy",
                error: true,
            });
        }
    }

    async getPolicy(req: AuthenticatedRequest, res: Response) {
        try {
            const { regionCode } = req.params;
            const policy = await leavePolicyService.getPolicy(regionCode);
            return res.status(200).json({
                message: "Success",
                data: policy || {},
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 500).json({
                message: error?.message || "Failed to fetch leave policy",
                error: true,
            });
        }
    }
}

export const leavePolicyController = new LeavePolicyController();
