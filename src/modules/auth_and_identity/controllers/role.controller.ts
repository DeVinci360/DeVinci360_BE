import { Request, Response } from "express";
import { roleService } from "../services/role.service";

class RoleController {
    async createRole(req: Request, res: Response) {
        try {
            const role = await roleService.createRole(req.body);
            return res.status(201).json({
                message: "Role created successfully",
                data: role,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({
                message: error?.message || "Failed to create role",
                error: true,
            });
        }
    }

    async getRoles(req: Request, res: Response) {
        try {
            const roles = await roleService.getRoles();
            return res.status(200).json({
                message: "Success",
                data: roles,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 500).json({
                message: error?.message || "Failed to fetch roles",
                error: true,
            });
        }
    }

    async getRoleById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const role = await roleService.getRoleById(id);
            return res.status(200).json({
                message: "Success",
                data: role,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 500).json({
                message: error?.message || "Failed to fetch role",
                error: true,
            });
        }
    }

    async updateRole(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const role = await roleService.updateRole(id, req.body);
            return res.status(200).json({
                message: "Role updated successfully",
                data: role,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({
                message: error?.message || "Failed to update role",
                error: true,
            });
        }
    }

    async deleteRole(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const role = await roleService.deleteRole(id);
            return res.status(200).json({
                message: "Role deleted successfully",
                data: role,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({
                message: error?.message || "Failed to delete role",
                error: true,
            });
        }
    }
}

export const roleController = new RoleController();
