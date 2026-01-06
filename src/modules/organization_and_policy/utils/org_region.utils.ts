import mongoose from "mongoose";
import { AppError } from "../../../common/errors/app.error";

export const checkRegionId = (id: string) => {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
        throw new AppError("Invalid region id", 400);
    }
}