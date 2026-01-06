import { Router, RequestHandler } from "express";
import { roleCategoryController } from "../controllers/role_category.controller";
import { validate } from "../../../common/middlewares/validate.middleware";
import { roleCategorySchema } from "../validation_schemas/role_category.schema";
// import { authenticate } from "../../../common/middlewares/auth.middleware"; // Assuming auth is handled at parent level or not needed for now based on snippet

const roleCategoryRouter = Router();

/**
 * @swagger
 * /role-category/create:
 *   post:
 *     summary: Create a new role category
 *     tags: [Role Category]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *             properties:
 *               name:
 *                 type: string
 *               isActive:
 *                 type: boolean
 *     responses:
 *       201:
 *         description: Category created successfully
 */
roleCategoryRouter.post("/create", validate(roleCategorySchema), roleCategoryController.createCategory);

/**
 * @swagger
 * /role-category/list:
 *   get:
 *     summary: List all role categories
 *     tags: [Role Category]
 *     responses:
 *       200:
 *         description: List of categories
 */
roleCategoryRouter.get("/list", roleCategoryController.getCategories);

/**
 * @swagger
 * /role-category/{id}:
 *   put:
 *     summary: Update role category
 *     tags: [Role Category]
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
 *               isActive:
 *                 type: boolean
 *     responses:
 *       200:
 *         description: Category updated successfully
 */
roleCategoryRouter.put("/:id", validate(roleCategorySchema), roleCategoryController.updateCategory as unknown as RequestHandler);

/**
 * @swagger
 * /role-category/{id}:
 *   delete:
 *     summary: Delete role category
 *     tags: [Role Category]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Category deleted successfully
 */
roleCategoryRouter.delete("/:id", roleCategoryController.deleteCategory);

export default roleCategoryRouter;
