import { Router } from "express";
import { userController } from "./user.controller";
import { validate } from "../../common/middlewares/validate.middleware";
import { registerUserSchema, loginUserSchema } from "./user.schema";

const router = Router();

router.post('/egister', validate(registerUserSchema), userController.register)
router.post('/login', validate(loginUserSchema), userController.login)

export default router
