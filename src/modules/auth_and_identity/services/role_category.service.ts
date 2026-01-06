import { roleCategoryRepository } from "../repositories/role_category.repository";
import { AppError } from "../../../common/errors/app.error";
import { validateId } from "../../organization_and_policy/utils";

class RoleCategoryService {
    private validateCategoryId(id: string) {
        validateId(id, "Invalid category id");
    }

    async createCategory(data: any) {
        const existing = await roleCategoryRepository.isRoleCategoryNameExists(data.name);
        if (existing) {
            throw new AppError("Category with this name already exists", 400);
        }
        return await roleCategoryRepository.create(data);
    }

    async getCategories() {
        return await roleCategoryRepository.list();
    }

    async updateCategory(id: string, data: any) {
        this.validateCategoryId(id);
        if (data.name) {
            const existing = await roleCategoryRepository.isRoleCategoryNameExists(data.name);
            if (existing && existing._id.toString() !== id) {
                throw new AppError("Category with this name already exists", 400);
            }
        }
        const updated = await roleCategoryRepository.update(id, data);
        if (!updated) {
            throw new AppError("Category not found", 404);
        }
        return updated;
    }

    async deleteCategory(id: string) {
        const deleted = await roleCategoryRepository.delete(id);
        if (!deleted) {
            throw new AppError("Category not found", 404);
        }
        return deleted;
    }
}

export const roleCategoryService = new RoleCategoryService();
