import { roleRepository } from "../repositories/role.repository";
import { AppError } from "../../../common/errors/app.error";
import { roleCategoryRepository } from "../repositories/role_category.repository";
import { validateId } from "../../organization_and_policy/utils";

class RoleService {
    private validateRoleId(id: string) {
        validateId(id, "Invalid role id");
    }

    private async validateRoleCategoryAndRoleName(categoryId: string, name: string) {
        const [roleCategory, existing] = await Promise.all([
            roleCategoryRepository.isRoleCategoryExists(categoryId),
            roleRepository.findByName(name),
        ]);
        if (!roleCategory) {
            throw new AppError("Invalid role category", 404);
        }
        return existing;
    }

    private formatRole(role: any) {
        if (!role) return null;
        const formatted = { ...role };
        formatted.categoryName = role.categoryId.name;
        formatted.categoryId = role.categoryId._id.toString();

        return formatted;
    }

    async createRole(data: any) {
        const existing = await this.validateRoleCategoryAndRoleName(data.categoryId, data.name);
        if (existing) {
            throw new AppError("Role with this name already exists", 400);
        }

        return await roleRepository.create(data);
    }

    async getRoles() {
        const roles = await roleRepository.list();
        const formattedRoles = roles.map((role) => this.formatRole(role));
        return formattedRoles;
    }

    async getRoleById(id: string) {
        this.validateRoleId(id);
        const role = await roleRepository.findById(id);
        if (!role) {
            throw new AppError("Invalid role", 404);
        }
        return this.formatRole(role);
    }

    async updateRole(id: string, data: any) {
        this.validateRoleId(id);
        const existing = await this.validateRoleCategoryAndRoleName(data.categoryId, data.name);

        if (existing && existing._id.toString() !== id) {
            throw new AppError("Role with this name already exists", 400);
        }

        const updated = await roleRepository.update(id, data);
        if (!updated) {
            throw new AppError("Invalid role", 404);
        }
        return updated;
    }

    async deleteRole(id: string) {
        const deleted = await roleRepository.delete(id);
        if (!deleted) {
            throw new AppError("Invalid role", 404);
        }
        return deleted;
    }
}

export const roleService = new RoleService();
