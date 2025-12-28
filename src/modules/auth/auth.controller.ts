import { Request, Response } from "express";
import { authService } from "./auth.service";

export const login = async (req: Request, res: Response) => {
    const result = await authService.login(req.body);
    res.json(result);
};
