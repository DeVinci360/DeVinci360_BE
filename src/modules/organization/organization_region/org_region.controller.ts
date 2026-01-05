import { organizationRegionService } from "./org_region.service";
import { Request, Response } from "express";
import { checkRegionId } from "./org_region.utils";

class OrganizationRegionController {
    async createRegion(req: Request, res: Response) {
        try {
            const region = await organizationRegionService.createRegion(req.body);
            return res.status(201).json({
                message: "Region created successfully",
                data: region,
            });
        } catch (error: any) {
            return res.status(500).json({
                message: "Region creation failed",
                error: error?.message,
            });
        }
    }
    async regionList(req: Request, res: Response) {
        try {
            const region = await organizationRegionService.regionList();
            return res.status(200).json({
                message: "Region list fetched successfully",
                data: region,
            });
        } catch (error: any) {
            return res.status(500).json({
                message: "Region list fetching failed",
                error: error?.message,
            });
        }
    }
    async deleteRegion(req: Request, res: Response) {
        const { id } = req.params;
        try {
            checkRegionId(id);
            const region = await organizationRegionService.deleteRegion(id);
            return res.status(200).json({
                message: "Region deleted successfully",
                data: region,
            });
        } catch (error: any) {
            return res.status(500).json({
                message: "Region deletion failed",
                error: error?.message,
            });
        }
    }
    async marAsDefault(req: Request, res: Response) {
        const { id } = req.params;
        try {
            checkRegionId(id);
            const region = await organizationRegionService.marAsDefault(id);
            return res.status(200).json({
                message: "Region marked as default successfully",
                data: region,
            });
        } catch (error: any) {
            return res.status(500).json({
                message: "Region marking as default failed",
                error: error?.message,
            });
        }
    }
    async updateRegion(req: Request, res: Response) {
        const { id } = req.params;
        try {
            checkRegionId(id);
            const region = await organizationRegionService.updateRegion(id, req.body);
            return res.status(200).json({
                message: "Region updated successfully",
                data: region,
            });
        } catch (error: any) {
            return res.status(500).json({
                message: "Region update failed",
                error: error?.message,
            });
        }
    }
}

export const organizationRegionController = new OrganizationRegionController();