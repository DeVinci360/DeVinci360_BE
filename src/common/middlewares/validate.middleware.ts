import { ZodError, ZodObject } from "zod";
import { Request, Response, NextFunction } from "express";

export const validate =
    (schema: ZodObject<any>) =>
        (req: Request, res: Response, next: NextFunction) => {
            try {
                schema.parse(req.body);
                next();
            } catch (error: any) {
                //convert zod error to array of objects
                // const errors = error?.errors?.map((error: any) => ({
                //     field: error?.path?.[0],
                //     message: error?.message,
                // }));
                const parsedError = JSON.parse(error.message);
                const errorList = parsedError.map((error: any) => error?.message);
                return res.status(400).json({
                    message: "Validation error",
                    errors: errorList,
                });
            }
        };
