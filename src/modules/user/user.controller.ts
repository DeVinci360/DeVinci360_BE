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
        const { user, accessToken } = await userService.login({ email, password });
        response.cookie("accessToken", accessToken, {
            expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), //
            httpOnly: true,
            // secure: true,
            // sameSite: "strict",
        })
        response.status(200).json({
            message: "User logged in successfully",
            data: user
        });
    }),
    getUserDetailsById: asyncHandler(async (request: Request, response: Response) => {
        const { id } = request.params;
        const user = await userService.getUserDetailsById(id);
        response.status(200).json({
            message: "User details fetched successfully",
            data: user
        })
    })
}