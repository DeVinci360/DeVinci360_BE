import jwt from "jsonwebtoken";
import { env } from "../../config/env";

export const signAccessToken = (payload: object) => {
    const accessToken = jwt.sign(payload, env.JWT_ACCESS_SECRET, {
        expiresIn: env.JWT_ACCESS_EXPIRES_IN,
    } as any);

    return { accessToken, accessTokenExpiresIn: env.JWT_ACCESS_EXPIRES_IN }
};

export const signRefreshToken = (payload: object) => {
    return jwt.sign(payload, env.JWT_REFRESH_SECRET, {
        expiresIn: env.JWT_REFRESH_EXPIRES_IN,
    } as any);
};

export const verifyAccessToken = (token: string): any => {
    return jwt.verify(token, env.JWT_ACCESS_SECRET);
};

export const verifyRefreshToken = (token: string): any => {
    return jwt.verify(token, env.JWT_REFRESH_SECRET);
};
