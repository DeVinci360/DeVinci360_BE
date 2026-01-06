import { WorkScheduleModel } from "../models/work_schedule.model";

class WorkScheduleRepository {
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
