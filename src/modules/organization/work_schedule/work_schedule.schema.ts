import { z } from "zod";
import { DayOfWeekEnum } from "../../../common/enums";

const timeFormatRegex = /^([0-1]?[0-9]|2[0-3]):[0-5][0-9]\s?(AM|PM)?$/i;

const dayScheduleSchema = z.object({
    day: z.nativeEnum(DayOfWeekEnum),
    isWorkday: z.boolean(),
    startTime: z.string().optional().refine(val => !val || timeFormatRegex.test(val), "Invalid time format"),
    endTime: z.string().optional().refine(val => !val || timeFormatRegex.test(val), "Invalid time format"),
    breakStartTime: z.string().optional().refine(val => !val || timeFormatRegex.test(val), "Invalid time format"),
    breakEndTime: z.string().optional().refine(val => !val || timeFormatRegex.test(val), "Invalid time format")
});

export const workScheduleSchema = z.object({
    schedule: z.array(dayScheduleSchema)
});

export type WorkScheduleInput = z.infer<typeof workScheduleSchema>;
