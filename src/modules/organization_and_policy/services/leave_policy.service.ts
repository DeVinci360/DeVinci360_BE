import { leavePolicyRepository } from "../repositories/leave_policy.repository";
import { AppError } from "../../../common/errors/app.error";
import { organizationRegionRepository } from "../repositories/org_region.repository";

class LeavePolicyService {
    private async resolveRegionCode(regionCode: string) {
        const region = await organizationRegionRepository.checkRegionExistsByCode(regionCode);
        if (!region) {
            throw new AppError("Region not found", 404);
        }
        return region?._id?.toString();
    }

    async updatePolicy(regionCode: string, data: any) {
        const regionId = await this.resolveRegionCode(regionCode);
        return await leavePolicyRepository.upsertPolicy(regionId, data.leaveTypes);
    }

    async getPolicy(regionCode: string) {
        const regionId = await this.resolveRegionCode(regionCode);
        return await leavePolicyRepository.getPolicy(regionId);
    }
}

export const leavePolicyService = new LeavePolicyService();
