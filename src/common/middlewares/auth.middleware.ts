import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { userRepository } from "../../modules/user/user.repository";
import { UserModel } from "../../modules/user/user.model";

export const authenticate = async (
    req: Request,
    res: Response,
    next: NextFunction
) => {
    const accessToken = req.cookies.accessToken;
    if (!accessToken) {
        return res.status(401).json({ message: "Unauthorized" });
    }
    const decodedToken = verifyAccessToken(accessToken);
    try {
        const user = await UserModel.findById(decodedToken.id).select("_id").lean().catch(() => console.log("pppppppppppppppppppp"));
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}