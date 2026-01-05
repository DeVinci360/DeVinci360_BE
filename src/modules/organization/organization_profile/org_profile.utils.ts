import mongoose from "mongoose";
import { AppError } from "../../../common/errors/app.error";

export const checkProfileId = (id: string) => {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
        throw new AppError("Invalid profile id", 400);
    }
}