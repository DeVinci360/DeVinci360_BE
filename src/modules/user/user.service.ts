import { AppError } from "../../common/errors/app.error";
import { signAccessToken } from "../../common/utils/jwt";
import { comparePassword, hashPassword } from "../../common/utils/password";
import { userRepository } from "./user.repository";

export const userService = {
    register: async ({ email, password }: any) => {
        const isExisitingUser = await userRepository.findByEmail(email);
        if (isExisitingUser) {
            throw new AppError("User already exists", 409);
        }
        const hashedPassword = await hashPassword(password);
        return userRepository.createUser({
            email,
            password: hashedPassword,
        });
    },
    login: async ({ email, password }: any) => {
        const user = await userRepository.findByEmail(email, { selectPassword: true });
        if (!user) {
            throw new AppError("Invalid credentials", 401);
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new AppError("Invalid credentials", 401);
        }
        const { accessToken, accessTokenExpiresIn } = signAccessToken({ id: user._id })
        return { user, accessToken, accessTokenExpiresIn };
    },
    getUserDetailsById: async (id: string) => {
        if (!id) {
            throw new AppError("Invalid user id", 400);
        }
        const user = await userRepository.findById(id);
        if (!user) {
            throw new AppError("User not found", 404);
        }
        return user;
    }
};