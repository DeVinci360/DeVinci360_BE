import { Router, RequestHandler } from "express";
import { roleController } from "../controllers/role.controller";
import { validate } from "../../../common/middlewares/validate.middleware";
import { roleSchema } from "../validation_schemas/role.schema";

const roleRouter = Router();

/**
 * @swagger
 * /role/create:
 *   post:
 *     summary: Create a new role
 *     tags: [Role]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - color
 *             properties:
 *               name:
 *                 type: string
 *               color:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               description:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Role created successfully
 */
roleRouter.post("/create", validate(roleSchema), roleController.createRole);

/**
 * @swagger
 * /role/list:
 *   get:
 *     summary: List all active roles
 *     tags: [Role]
 *     responses:
 *       200:
 *         description: List of roles
 */
roleRouter.get("/list", roleController.getRoles);

/**
 * @swagger
 * /role/{id}:
 *   put:
 *     summary: Update role details
 *     tags: [Role]
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
 *               name:
 *                 type: string
 *               color:
 *                 type: string
 *               categoryId:
 *                 type: string
 *               description:
 *                 type: string
 *               permissions:
 *                 type: array
 *                 items:
 *                   type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Role updated successfully
 */
roleRouter.put("/:id", validate(roleSchema), roleController.updateRole as unknown as RequestHandler);

/**
 * @swagger
 * /role/{id}:
 *   delete:
 *     summary: Delete role
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role deleted successfully
 */
roleRouter.delete("/:id", roleController.deleteRole);

/**
 * @swagger
 * /role/{id}:
 *   get:
 *     summary: Get role by id
 *     tags: [Role]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Role details
 */
roleRouter.get("/:id", roleController.getRoleById);

export default roleRouter;
