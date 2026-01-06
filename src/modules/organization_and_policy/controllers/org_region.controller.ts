import { organizationRegionService } from "../services/org_region.service";
import { Request, Response } from "express";

class OrganizationRegionController {
    async createRegion(req: Request, res: Response) {
        try {
            const region = await organizationRegionService.createRegion(req.body);
            return res.status(201).json({
                message: "Success",
                data: region,
            });
        } catch (error: any) {
            return res.status(500).json({
                message: "Failed",
                error: error?.message,
            });
        }
    }
    async regionList(req: Request, res: Response) {
        try {
            const { regions, totalRegions } = await organizationRegionService.regionList();
            return res.status(200).json({
                message: "Success",
                data: { regions, totalRegions },
            });
        } catch (error: any) {
            return res.status(500).json({
                message: "Failed",
                error: error?.message,
            });
        }
    }
    async deleteRegion(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const region = await organizationRegionService.deleteRegion(id);
            return res.status(200).json({
                message: "Success",
                data: region,
            });
        } catch (error: any) {
            return res.status(500).json({
                message: "Failed",
                error: error?.message,
            });
        }
    }
    async marAsDefault(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const region = await organizationRegionService.marAsDefault(id);
            return res.status(200).json({
                message: "Success",
                data: region,
            });
        } catch (error: any) {
            return res.status(500).json({
                message: "Failed",
                error: error?.message,
            });
        }
    }
    async updateRegion(req: Request, res: Response) {
        const { id } = req.params;
        try {
            const region = await organizationRegionService.updateRegion(id, req.body);
            return res.status(200).json({
                message: "Success",
                data: region,
            });
        } catch (error: any) {
            return res.status(500).json({
                message: "Failed",
                error: error?.message,
            });
        }
    }
}

export const organizationRegionController = new OrganizationRegionController();