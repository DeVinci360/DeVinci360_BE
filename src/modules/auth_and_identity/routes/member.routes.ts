import { Router, RequestHandler } from "express";
import { memberController } from "../controllers/member.controller";
import { validate } from "../../../common/middlewares/validate.middleware";
import { memberSchema } from "../validation_schemas/member.schema";

const memberRouter = Router();

/**
 * @swagger
 * /member/create:
 *   post:
 *     summary: Create a new member
 *     tags: [Member]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - firstName
 *               - lastName
 *               - email
 *               - roleId
 *             properties:
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               roleId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Active, Inactive, Invited]
 *               reportingMemberId:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               emergencyContactName:
 *                 type: string
 *               emergencyContactPhone:
 *                 type: string
 *     responses:
 *       201:
 *         description: Member created successfully
 */
memberRouter.post("/create", validate(memberSchema), memberController.createMember);

/**
 * @swagger
 * /member/list:
 *   get:
 *     summary: List all members
 *     tags: [Member]
 *     responses:
 *       200:
 *         description: List of members
 */
memberRouter.get("/list", memberController.getMembers);

/**
 * @swagger
 * /member/{id}:
 *   get:
 *     summary: Get member by ID
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Member details
 */
memberRouter.get("/:id", memberController.getMemberById);

/**
 * @swagger
 * /member/{id}:
 *   put:
 *     summary: Update member details
 *     tags: [Member]
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
 *               firstName:
 *                 type: string
 *               lastName:
 *                 type: string
 *               email:
 *                 type: string
 *               roleId:
 *                 type: string
 *               status:
 *                 type: string
 *                 enum: [Active, Inactive, Invited]
 *               reportingMemberId:
 *                 type: string
 *               address:
 *                 type: string
 *               phone:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               emergencyContactName:
 *                 type: string
 *               emergencyContactPhone:
 *                 type: string
 *     responses:
 *       200:
 *         description: Member updated successfully
 */
memberRouter.put("/:id", validate(memberSchema.partial()), memberController.updateMember as unknown as RequestHandler);

/**
 * @swagger
 * /member/{id}:
 *   delete:
 *     summary: Delete member
 *     tags: [Member]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Member deleted successfully
 */
memberRouter.delete("/:id", memberController.deleteMember);

export default memberRouter;
