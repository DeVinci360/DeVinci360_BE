import { workScheduleRepository } from "./work_schedule.repository";
import { AppError } from "../../../common/errors/app.error";

import { DayOfWeekEnum } from "../../../common/enums";
import { checkRegionExistsByCode } from "..";

class WorkScheduleService {
    private async resolveRegionCode(regionCode: string) {
        const region = await checkRegionExistsByCode(regionCode);
        if (!region) {
            throw new AppError("Region not found", 404);
        }
        return region?._id?.toString();
    }

    private mergeScheduleWithDefaults(incomingSchedule: any[]) {
        const defaultSchedule = Object.values(DayOfWeekEnum)
            .filter((v) => typeof v === "number")
            .map(day => ({
                day,
                isWorkday: false,
                startTime: "09:00 AM",
                endTime: "05:00 PM",
                breakStartTime: "01:00 PM",
                breakEndTime: "02:00 PM"
            }));

        const incomingMap = new Map(incomingSchedule.map(item => [item.day, item]));

        return defaultSchedule.map(defaultDay => {
            return incomingMap.has(defaultDay.day) ? incomingMap.get(defaultDay.day) : defaultDay;
        });
    }

    async updateSchedule(regionCode: string, data: any) {
        const regionId = await this.resolveRegionCode(regionCode);
        const completeSchedule = this.mergeScheduleWithDefaults(data.schedule);
        return await workScheduleRepository.upsertSchedule(regionId, completeSchedule);
    }

    async getSchedule(regionCode: string) {
        const regionId = await this.resolveRegionCode(regionCode);
        return await workScheduleRepository.getSchedule(regionId);
    }
}

export const workScheduleService = new WorkScheduleService();
