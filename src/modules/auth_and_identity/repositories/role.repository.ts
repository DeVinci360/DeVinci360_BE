import { RoleModel } from "../models/role.model";

class RoleRepository {
    async create(data: any) {
        return await RoleModel.create(data);
    }

    async list() {
        return await RoleModel.find({ isActive: true })
            .select("-__v -isActive")
            .populate("categoryId", "name")
            .lean();
    }

    async update(id: string, data: any) {
        return await RoleModel.findByIdAndUpdate(id, { $set: data }, { new: true })
            .populate("categoryId", "name");
    }

    async delete(id: string) {
        return await RoleModel.findByIdAndDelete(id);
    }

    async findByName(name: string) {
        return await RoleModel.findOne({ name: { $regex: new RegExp(`^${name}$`, "i") } });
    }

    async findById(id: string) {
        return await RoleModel.findById(id)
            .select("-__v -isActive")
            .populate("categoryId", "name")
            .lean();
    }
}

export const roleRepository = new RoleRepository();
