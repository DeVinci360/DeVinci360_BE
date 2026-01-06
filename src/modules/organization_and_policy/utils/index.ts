import mongoose from "mongoose";
import { AppError } from "../../../common/errors/app.error";

export const validateId = (id: string, message: string) => {
    const isValidId = mongoose.Types.ObjectId.isValid(id);
    if (!isValidId) {
        throw new AppError(message, 400);
    }
}