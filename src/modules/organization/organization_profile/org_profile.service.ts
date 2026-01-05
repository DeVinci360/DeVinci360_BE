import { AppError } from "../../../common/errors/app.error";
import { organizationProfileRepository } from "./org_profile.repository";

class OrganizationProfileService {
    async create(data: any) {
        const totalProfiles = await organizationProfileRepository.totalProfiles();
        if (totalProfiles > 0) {
            throw new AppError("Profile already exists", 400);
        }
        return await organizationProfileRepository.create(data);
    }
    async getProfile() {
        const profile = await organizationProfileRepository.getProfile();
        if (!profile) {
            throw new AppError("Profile not found", 404);
        }
        return profile;
    }
    async updateProfile(data: any) {
        return await organizationProfileRepository.update(data);
    }
}

export const organizationProfileService = new OrganizationProfileService();
