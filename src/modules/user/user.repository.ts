import { UserModel } from "./user.model";

export const userRepository = {
    createUser: (data: { email: string; password: string }) => {
        return UserModel.create(data);
    },
    findByEmail: (email: string, options?: { selectPassword?: boolean }) => {
        return UserModel.findOne({ email })
            .select(options?.selectPassword ? "+password" : "-password");
    },
    findById: (id: string) => {
        return UserModel.findById(id);
    }
};