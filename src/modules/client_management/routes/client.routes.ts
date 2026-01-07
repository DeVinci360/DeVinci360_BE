import { Router, RequestHandler } from "express";
import { clientController } from "../controllers/client.controller";
import { validate } from "../../../common/middlewares/validate.middleware";
import { clientSchema } from "../validation_schemas/client.schema";

const clientRouter = Router();

/**
 * @swagger
 * /client/create:
 *   post:
 *     summary: Create a new client
 *     tags: [Client]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - companyName
 *             properties:
 *               companyName:
 *                 type: string
 *               industry:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Active, Inactive]
 *               website:
 *                 type: string
 *               location:
 *                 type: string
 *               contactPerson:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Client created successfully
 */
clientRouter.post("/create", validate(clientSchema), clientController.createClient);

/**
 * @swagger
 * /client/list:
 *   get:
 *     summary: List all clients
 *     tags: [Client]
 *     responses:
 *       200:
 *         description: List of clients
 */
clientRouter.get("/list", clientController.getClients);

/**
 * @swagger
 * /client/{id}:
 *   get:
 *     summary: Get client by ID
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client details
 */
clientRouter.get("/:id", clientController.getClientById);

/**
 * @swagger
 * /client/{id}:
 *   put:
 *     summary: Update client details
 *     tags: [Client]
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
 *               companyName:
 *                 type: string
 *               industry:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Active, Inactive]
 *               website:
 *                 type: string
 *               location:
 *                 type: string
 *               contactPerson:
 *                 type: string
 *               email:
 *                 type: string
 *               phone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Client updated successfully
 */
clientRouter.put("/:id", validate(clientSchema.partial()), clientController.updateClient as unknown as RequestHandler);

/**
 * @swagger
 * /client/{id}:
 *   delete:
 *     summary: Delete client
 *     tags: [Client]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Client deleted successfully
 */
clientRouter.delete("/:id", clientController.deleteClient);

export default clientRouter;
