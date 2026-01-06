import { Router } from "express";
import { organizationRegionController } from "../controllers/org_region.controller";
import { validate } from "../../../common/middlewares/validate.middleware";
import { orgRegionSchema } from "../validation_schemas/org_region.schema";

const organizationRegionRouter = Router();

/**
 * @swagger
 * /organization/region/create:
 *   post:
 *     summary: Create a new organization region
 *     tags: [Organization Region]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - regionName
 *             properties:
 *               regionName:
 *                 type: string
 *               regionCode:
 *                 type: string
 *               isDefault:
 *                 type: boolean
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Region created successfully
 *       500:
 *         description: Server error
 */
organizationRegionRouter.post("/create", validate(orgRegionSchema), organizationRegionController.createRegion);

/**
 * @swagger
 * /organization/region/list:
 *   get:
 *     summary: List all organization regions
 *     tags: [Organization Region]
 *     responses:
 *       200:
 *         description: List of regions
 */
organizationRegionRouter.get("/list", organizationRegionController.regionList);

/**
 * @swagger
 * /organization/region/{id}:
 *   delete:
 *     summary: Delete a region by ID
 *     tags: [Organization Region]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Region deleted successfully
 */
organizationRegionRouter.delete("/:id", organizationRegionController.deleteRegion);

/**
 * @swagger
 * /organization/region/{id}:
 *   put:
 *     summary: Update a region by ID
 *     tags: [Organization Region]
 *     parameters:
 *       - in: path
 *         name: id
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
 *               regionName:
 *                 type: string
 *               regionCode:
 *                 type: string
 *               isDefault:
 *                 type: boolean
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Region updated successfully
 */
organizationRegionRouter.put("/:id", validate(orgRegionSchema), organizationRegionController.updateRegion);

/**
 * @swagger
 * /organization/region/{id}/mark-as-default:
 *   patch:
 *     summary: Mark a region as default
 *     tags: [Organization Region]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Region marked as default
 */
organizationRegionRouter.patch("/:id/mark-as-default", organizationRegionController.marAsDefault);

export default organizationRegionRouter;