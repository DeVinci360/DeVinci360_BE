import { Request, Response } from "express";
import { memberService } from "../services/member.service";

class MemberController {
    async createMember(req: Request, res: Response) {
        try {
            const member = await memberService.createMember(req.body);
            return res.status(201).json({
                message: "Member created successfully",
                data: member,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({
                message: error?.message || "Failed to create member",
                error: true,
            });
        }
    }

    async getMembers(req: Request, res: Response) {
        try {
            const members = await memberService.getMembers();
            return res.status(200).json({
                message: "Success",
                data: members,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 500).json({
                message: error?.message || "Failed to fetch members",
                error: true,
            });
        }
    }

    async getMemberById(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const member = await memberService.getMemberById(id);
            return res.status(200).json({
                message: "Success",
                data: member,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 500).json({
                message: error?.message || "Failed to fetch member",
                error: true,
            });
        }
    }

    async updateMember(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const member = await memberService.updateMember(id, req.body);
            return res.status(200).json({
                message: "Member updated successfully",
                data: member,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({
                message: error?.message || "Failed to update member",
                error: true,
            });
        }
    }

    async deleteMember(req: Request, res: Response) {
        try {
            const { id } = req.params;
            const member = await memberService.deleteMember(id);
            return res.status(200).json({
                message: "Member deleted successfully",
                data: member,
            });
        } catch (error: any) {
            return res.status(error?.statusCode || 400).json({
                message: error?.message || "Failed to delete member",
                error: true,
            });
        }
    }
}

export const memberController = new MemberController();
