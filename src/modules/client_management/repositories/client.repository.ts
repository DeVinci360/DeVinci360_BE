import { ClientModel } from "../models/client.model";

class ClientRepository {
    async create(data: any) {
        return await ClientModel.create(data);
    }

    async list() {
        return await ClientModel.find().select("-__v").lean();
    }

    async findById(id: string) {
        return await ClientModel.findById(id).select("-__v").lean();
    }

    async findByEmail(email: string) {
        return await ClientModel.findOne({ email: email.toLowerCase() }).lean();
    }

    async update(id: string, data: any) {
        return await ClientModel.findByIdAndUpdate(id, { $set: data }, { new: true }).select("-__v");
    }

    async delete(id: string) {
        return await ClientModel.findByIdAndDelete(id);
    }

    async isCompanyNameExists(companyName: string) {
        return await ClientModel.exists({ companyName: { $regex: new RegExp(`^${companyName}$`, "i") } });
    }
}

export const clientRepository = new ClientRepository();
