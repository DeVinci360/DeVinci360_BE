import { RoleCategoryModel } from "../models/role_category.model";

class RoleCategoryRepository {
    async create(data: any) {
        return await RoleCategoryModel.create(data);
    }

    async list() {
        return await RoleCategoryModel.find({ isActive: true });
    }

    async update(id: string, data: any) {
        return await RoleCategoryModel.findByIdAndUpdate(id, { $set: data }, { new: true });
    }

    async delete(id: string) {
        return await RoleCategoryModel.findByIdAndDelete(id);
    }

    async isRoleCategoryNameExists(name: string) {
        return await RoleCategoryModel.exists({ name: { $regex: new RegExp(`^${name}$`, "i") } });
    }

    async isRoleCategoryExists(id: string) {
        return await RoleCategoryModel.exists({ _id: id });
    }
}

export const roleCategoryRepository = new RoleCategoryRepository();
