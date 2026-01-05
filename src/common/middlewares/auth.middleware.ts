import { NextFunction, Request, Response } from "express";
import { verifyAccessToken } from "../utils/jwt";
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
    try {
        const decodedToken = verifyAccessToken(accessToken);
        const user = await UserModel.findById(decodedToken.id).select("_id").lean().catch(() => console.log("pppppppppppppppppppp"));
        if (!user) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        (req as any).user = user;
        next();
    } catch (error) {
        return res.status(401).json({ message: "Unauthorized" });
    }
}