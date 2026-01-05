import { WorkScheduleModel } from "./work_schedule.model";
import { OrganizationRegionModel } from "../organization_region/org_region.model";

class WorkScheduleRepository {
    async checkRegionExistsByCode(regionCode: string) {
        return await OrganizationRegionModel.exists({ regionCode: { $regex: new RegExp(`^${regionCode}$`, "i") } });
    }

    async upsertSchedule(regionId: string, schedule: any) {
        return await WorkScheduleModel.findOneAndUpdate(
            { regionId },
            { $set: { schedule, regionId } },
            { new: true, upsert: true, setDefaultsOnInsert: true }
        );
    }

    async getSchedule(regionId: string) {
        return await WorkScheduleModel.findOne({ regionId });
    }
}

export const workScheduleRepository = new WorkScheduleRepository();
