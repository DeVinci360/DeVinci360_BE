import { Request, Response } from "express";
import { organizationProfileService } from "../services/org_profile.service";
import { AuthenticatedRequest } from "../../../common/types";

class OrganizationProfileController {
    async createOrganization(req: Request, res: Response) {
        try {
            const profile = await organizationProfileService.create(req.body);
            return res.status(201).json({
                message: "Organization profile created successfully",
                data: profile,
            });
        } catch (error: any) {
            return res.status(400).json({
                message: error?.message || "Failed to create profile",
                error: true,
            });
        }
    }

    async updateProfile(req: AuthenticatedRequest, res: Response) {
        try {
            const profile = await organizationProfileService.updateProfile(req.body);
            return res.status(200).json({
                message: "Organization profile updated successfully",
                data: profile,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 500).json({
                message: error?.message || "Failed to update profile",
                error: true,
            });
        }
    }

    async getProfile(req: AuthenticatedRequest, res: Response) {
        try {
            const profile = await organizationProfileService.getProfile();
            return res.status(200).json({
                message: "Success",
                data: profile,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 500).json({
                message: error?.message || "Failed to fetch profile",
                error: true,
            });
        }
    }
}

export const organizationProfileController = new OrganizationProfileController();
