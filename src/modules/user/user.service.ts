import { AppError } from "../../common/errors/app.error";
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
        const user = await userRepository.findByEmail(email);
        if (!user) {
            throw new AppError("Invalid credentials", 401);
        }
        const isPasswordValid = await comparePassword(password, user.password);
        if (!isPasswordValid) {
            throw new AppError("Invalid credentials", 401);
        }
        return user;
    },
};