import { asyncHandler } from "../../common/utils/asyncHandler";
import { userService } from "./user.service";
import { Request, Response } from "express";

export const userController = {
    register: asyncHandler(async (request: Request, response: Response) => {
        const { email, password } = request.body;
        const user = await userService.register({ email, password });
        response.status(201).json({
            message: "User registered successfully",
            data: { id: user._id }
        });
    }),
    login: asyncHandler(async (request: Request, response: Response) => {
        const { email, password } = request.body;
        const user = await userService.login({ email, password });
        response.status(200).json({
            message: "User logged in successfully",
            data: { id: user._id }
        });
    })
}