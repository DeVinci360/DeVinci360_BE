import { app } from "../src/app";
import { connectMongo } from "../src/infrastructure/database/mongo";

// Cache the database connection
let isConnected = false;

const connectToDatabase = async () => {
    if (isConnected) {
        console.log('=> Using existing database connection');
        return;
    }

    console.log('=> Creating new database connection');
    await connectMongo();
    isConnected = true;
};

export default async function handler(req: any, res: any) {
    await connectToDatabase();
    app(req, res);
}
