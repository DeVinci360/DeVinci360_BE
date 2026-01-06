import { Router, RequestHandler } from "express";
import { regionalSettingsController } from "../controllers/regional_settings.controller";
import { validate } from "../../../common/middlewares/validate.middleware";
import { authenticate } from "../../../common/middlewares/auth.middleware";
import { regionalSettingsSchema } from "../validation_schemas/regional_settings.schema";

const regionalSettingsRouter = Router();

/**
 * @swagger
 * /organization/regional-settings/{regionCode}:
 *   get:
 *     summary: Get regional settings
 *     tags: [Organization Regional Settings]
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
 *         description: Regional settings details
 *       404:
 *         description: Settings not found
 */
regionalSettingsRouter.get("/:regionCode", regionalSettingsController.getSettings as unknown as RequestHandler);

/**
 * @swagger
 * /organization/regional-settings/{regionCode}:
 *   put:
 *     summary: Update regional settings
 *     tags: [Organization Regional Settings]
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
 *               useGlobalSettings:
 *                 type: boolean
 *               regionalOrganizationName:
 *                 type: string
 *               regionalContactEmail:
 *                 type: string
 *               regionalContactNumber:
 *                 type: string
 *               timezone:
 *                 type: string
 *               dateFormat:
 *                 type: string
 *               currency:
 *                 type: string
 *     responses:
 *       200:
 *         description: Settings updated successfully
 */
regionalSettingsRouter.put("/:regionCode", validate(regionalSettingsSchema), regionalSettingsController.updateSettings as unknown as RequestHandler);

export default regionalSettingsRouter;
