import { Router, RequestHandler } from "express";
import { workScheduleController } from "../controllers/work_schedule.controller";
import { validate } from "../../../common/middlewares/validate.middleware";
import { authenticate } from "../../../common/middlewares/auth.middleware";
import { workScheduleSchema } from "../validation_schemas/work_schedule.schema";

const workScheduleRouter = Router();

/**
 * @swagger
 * /organization/work-schedule/{regionCode}:
 *   get:
 *     summary: Get work schedule
 *     tags: [Organization Work Schedule]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: regionCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Work schedule details
 *       404:
 *         description: Schedule not found
 */
workScheduleRouter.get("/:regionCode", workScheduleController.getSchedule as unknown as RequestHandler);

/**
 * @swagger
 * /organization/work-schedule/{regionCode}:
 *   put:
 *     summary: Update work schedule
 *     tags: [Organization Work Schedule]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: regionCode
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               schedule:
 *                 type: array
 *                 items:
 *                   type: object
 *     responses:
 *       200:
 *         description: Schedule updated successfully
 */
workScheduleRouter.put("/:regionCode", validate(workScheduleSchema), workScheduleController.updateSchedule as unknown as RequestHandler);

export default workScheduleRouter;
