import { model, Schema } from "mongoose";
import { DayOfWeekEnum } from "../../../common/enums";

const dayScheduleSchema = new Schema({
    day: {
        type: Number,
        enum: Object.values(DayOfWeekEnum).filter((v) => typeof v === "number"),
        required: true
    },
    isWorkday: { type: Boolean, default: false },
    startTime: { type: String, default: "09:00 AM" },
    endTime: { type: String, default: "05:00 PM" },
    breakStartTime: { type: String, default: "01:00 PM" },
    breakEndTime: { type: String, default: "02:00 PM" }
}, { _id: false });

const workScheduleSchema = new Schema({
    regionId: {
        type: Schema.Types.ObjectId,
        ref: "organization_region",
        required: true,
        unique: true
    },
    schedule: [dayScheduleSchema]
}, {
    timestamps: true
});

// Ensure unique schedule per region
workScheduleSchema.index({ regionId: 1 }, { unique: true });

export const WorkScheduleModel = model("work_schedule", workScheduleSchema);
