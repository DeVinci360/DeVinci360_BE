import { Schema, model } from "mongoose";

interface IUser extends Document {
    email: string,
    password: string,
}

const userSchema = new Schema<IUser>({
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: true,
        select: false,
    },
}, {
    timestamps: true
})

const UserModel = model<IUser>("User", userSchema);

export {
    userSchema,
    UserModel
};