import dotenv from "dotenv";
dotenv.config();

console.log(process.env)

export const env = {
    PORT: process.env.PORT || 4000,
    NODE_ENV: process.env.NODE_ENV || "development",
    MONGO_URI: process.env.MONGO_URI || "mongodb+srv://vvncherotkln_db_user:swkEFsIAsrHmreSH@vishal.pc1d8qo.mongodb.net/DeVinci360",

    JWT_ACCESS_SECRET: process.env.JWT_ACCESS_SECRET || "",
    JWT_REFRESH_SECRET: process.env.JWT_REFRESH_SECRET || "",
    JWT_ACCESS_EXPIRES_IN: process.env.JWT_ACCESS_EXPIRES_IN || "15m",
    JWT_REFRESH_EXPIRES_IN: process.env.JWT_REFRESH_EXPIRES_IN || "7d",
};
