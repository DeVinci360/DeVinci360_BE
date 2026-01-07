import { memberRepository } from "../repositories/member.repository";
import { roleRepository } from "../repositories/role.repository";
import { AppError } from "../../../common/errors/app.error";
import { validateId } from "../../organization_and_policy/utils";

class MemberService {
    private formatMember(member: any) {
        if (!member) return null;
        const formatted = { ...member };
        if (formatted._id) formatted._id = formatted._id.toString();

        // Flatten role
        if (formatted.roleId && typeof formatted.roleId === 'object') {
            formatted.roleName = formatted.roleId.name;
            formatted.roleColor = formatted.roleId.color;
            formatted.roleId = formatted.roleId._id.toString();
        }

        if (formatted.reportingMemberId && typeof formatted.reportingMemberId === 'object') {
            formatted.reportingMemberName = `${formatted.reportingMemberId.firstName} ${formatted.reportingMemberId.lastName}`;
            formatted.reportingMemberId = formatted.reportingMemberId._id.toString();
        }

        return formatted;
    }

    async createMember(data: any) {
        const existingEmail = await memberRepository.findByEmail(data.email);
        if (existingEmail) {
            throw new AppError("Email already exists", 400);
        }

        if (data.roleId) {
            const roleExists = await roleRepository.findById(data.roleId);
            if (!roleExists) {
                throw new AppError("Invalid role ID", 400);
            }
        }

        if (data.reportingMemberId) {
            const memberExists = await memberRepository.exists(data.reportingMemberId);
            if (!memberExists) {
                throw new AppError("Invalid reporting member ID", 400);
            }
        }

        const member = (await memberRepository.create(data)) as any;
        return member ? member.toObject() : null;
    }

    async getMembers() {
        const members = await memberRepository.list();
        return members.map(m => this.formatMember(m));
    }

    async getMemberById(id: string) {
        validateId(id, "Invalid member ID");
        const member = await memberRepository.findById(id);
        if (!member) {
            throw new AppError("Member not found", 404);
        }
        return this.formatMember(member);
    }

    async updateMember(id: string, data: any) {
        validateId(id, "Invalid member ID");

        if (data.email) {
            const existingEmail = await memberRepository.findByEmail(data.email);
            if (existingEmail && existingEmail._id.toString() !== id) {
                throw new AppError("Email already in use", 400);
            }
        }

        if (data.roleId) {
            const roleExists = await roleRepository.findById(data.roleId);
            if (!roleExists) {
                throw new AppError("Invalid role ID", 400);
            }
        }

        if (data.reportingMemberId) {
            if (data.reportingMemberId === id) {
                throw new AppError("Member cannot report to themselves", 400);
            }
            const memberExists = await memberRepository.exists(data.reportingMemberId);
            if (!memberExists) {
                throw new AppError("Invalid reporting member ID", 400);
            }
        }

        const updated = await memberRepository.update(id, data);
        if (!updated) {
            throw new AppError("Member not found", 404);
        }
        return updated;
    }

    async deleteMember(id: string) {
        validateId(id, "Invalid member ID");
        const deleted = await memberRepository.delete(id);
        if (!deleted) {
            throw new AppError("Member not found", 404);
        }
        return deleted;
    }
}

export const memberService = new MemberService();
