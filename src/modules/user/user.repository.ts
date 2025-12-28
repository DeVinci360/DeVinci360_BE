import { UserModel } from "./user.model";

export const userRepository = {
    createUser: (data: { email: string; password: string }) => {
        return UserModel.create(data);
    },
    findByEmail: (email: string) => {
        return UserModel.findOne({ email });
    },
};