import { Router, RequestHandler } from "express";
import { organizationProfileController } from "./org_profile.controller";
import { validate } from "../../../common/middlewares/validate.middleware";
import { organizationProfileSchema } from "./org_profile.schema";

const router = Router();

/**
 * @swagger
 * /organization/profile/create:
 *   post:
 *     summary: Create a new organization profile
 *     tags: [Organization Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - organizationName
 *               - contactEmail
 *               - contactNumber
 *             properties:
 *               organizationName:
 *                 type: string
 *               contactEmail:
 *                 type: string
 *                 format: email
 *               website:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               description:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Profile created successfully
 *       400:
 *         description: Validation error or profile already exists
 *       401:
 *         description: Unauthorized
 */
router.post("/create", validate(organizationProfileSchema), organizationProfileController.createOrganization);

/**
 * @swagger
 * /organization/profile:
 *   get:
 *     summary: Get organization profile by ID
 *     tags: [Organization Profile]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile details
 *       404:
 *         description: Profile not found
 */
router.get("/", organizationProfileController.getProfile as unknown as RequestHandler);

/**
 * @swagger
 * /organization/profile:
 *   put:
 *     summary: Update organization profile
 *     tags: [Organization Profile]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               organizationName:
 *                 type: string
 *               contactEmail:
 *                 type: string
 *               website:
 *                 type: string
 *               contactNumber:
 *                 type: string
 *               description:
 *                 type: string
 *               regionId:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Profile updated successfully
 *       404:
 *         description: Profile not found
 */
router.put("/", validate(organizationProfileSchema), organizationProfileController.updateProfile as unknown as RequestHandler);

export default router;
