import { LeavePolicyModel } from "./leave_policy.model";

class LeavePolicyRepository {
    async upsertPolicy(regionId: string, leaveTypes: any[]) {
        return await LeavePolicyModel.findOneAndUpdate(
            { regionId },
            { $set: { leaveTypes, regionId } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
    }

    async getPolicy(regionId: string) {
        return await LeavePolicyModel.findOne({ regionId });
    }
}

export const leavePolicyRepository = new LeavePolicyRepository();
