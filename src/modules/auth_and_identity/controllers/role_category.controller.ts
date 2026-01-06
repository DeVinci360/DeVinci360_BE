import { Request, Response } from "express";
import { roleCategoryService } from "../services/role_category.service";

class RoleCategoryController {
    async createCategory(req: Request, res: Response) {
        try {
            const category = await roleCategoryService.createCategory(req.body);
            return res.status(201).json({
                message: "Role category created successfully",
                data: category,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({
                message: error?.message || "Failed to create category",
                error: true,
            });
        }
    }

    async getCategories(req: Request, res: Response) {
        try {
            const categories = await roleCategoryService.getCategories();
            return res.status(200).json({
                message: "Success",
                data: categories,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 500).json({
                message: error?.message || "Failed to fetch categories",
                error: true,
            });
        }
    }

    async updateCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const category = await roleCategoryService.updateCategory(id, req.body);
            return res.status(200).json({
                message: "Role category updated successfully",
                data: category,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({
                message: error?.message || "Failed to update category",
                error: true,
            });
        }
    }

    async deleteCategory(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const category = await roleCategoryService.deleteCategory(id);
            return res.status(200).json({
                message: "Role category deleted successfully",
                data: category,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({
                message: error?.message || "Failed to delete category",
                error: true,
            });
        }
    }
}

export const roleCategoryController = new RoleCategoryController();
