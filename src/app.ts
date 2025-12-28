import express from "express";
import cors from "cors";
import helmet from "helmet";
import routes from "./routes";
import { globalErrorHandler } from "./common/middlewares/error.middleware";
import { notFound } from "./common/middlewares/notFound.middleware";
import cookieParser from "cookie-parser";

export const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(cookieParser());

app.use("/api", routes);

app.use(notFound);
app.use(globalErrorHandler);
