import { Router, RequestHandler } from "express";
import { leavePolicyController } from "../controllers/leave_policy.controller";
import { validate } from "../../../common/middlewares/validate.middleware";
import { authenticate } from "../../../common/middlewares/auth.middleware";
import { leavePolicySchema } from "../validation_schemas/leave_policy.schema";

const router = Router();

/**
 * @swagger
 * /organization/leave-policy/{regionCode}:
 *   get:
 *     summary: Get leave policy
 *     tags: [Organization Leave Policy]
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
 *         description: Leave policy details
 *       404:
 *         description: Policy not found
 */
router.get("/:regionCode", leavePolicyController.getPolicy as unknown as RequestHandler);

/**
 * @swagger
 * /organization/leave-policy/{regionCode}:
 *   put:
 *     summary: Update leave policy
 *     tags: [Organization Leave Policy]
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
 *               leaveTypes:
 *                 type: array
 *                 items:
 *                   type: object
 *                   properties:
 *                     name:
 *                       type: string
 *                     annualAllowance:
 *                       type: number
 *                     minNoticeDays:
 *                       type: number
 *                     isSpecial:
 *                       type: boolean
 *                     carryForward:
 *                       type: boolean
 *                     description:
 *                       type: string
 *     responses:
 *       200:
 *         description: Policy updated successfully
 */
router.put("/:regionCode", validate(leavePolicySchema), leavePolicyController.updatePolicy as unknown as RequestHandler);

export default router;
