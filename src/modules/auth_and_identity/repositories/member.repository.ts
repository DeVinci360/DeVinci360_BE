import { MemberModel } from "../models/member.model";

class MemberRepository {
    async create(data: any) {
        return await MemberModel.create(data);
    }

    async list() {
        return await MemberModel.find()
            .select("-__v")
            .populate("roleId", "name color")
            .populate("reportingMemberId", "firstName lastName")
            .lean();
    }

    async findById(id: string) {
        return await MemberModel.findById(id)
            .select("-__v")
            .populate("roleId", "name color _id")
            .populate("reportingMemberId", "firstName lastName _id")
            .lean();
    }

    async findByEmail(email: string) {
        return await MemberModel.findOne({ email: email.toLowerCase() }).lean();
    }

    async update(id: string, data: any) {
        return await MemberModel.findByIdAndUpdate(id, { $set: data }, { new: true })
            .select("-__v")
        // .populate("roleId", "name color _id")
        // .populate("reportingMemberId", "firstName lastName _id");
    }

    async delete(id: string) {
        return await MemberModel.findByIdAndDelete(id);
    }

    async exists(id: string) {
        return await MemberModel.exists({ _id: id });
    }
}

export const memberRepository = new MemberRepository();
