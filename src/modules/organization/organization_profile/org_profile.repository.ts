import { OrganizationProfileModel } from "./org_profile.model";

class OrganizationProfileRepository {
    async create(data: any) {
        return await OrganizationProfileModel.create(data);
    }

    async update(data: any) {
        return await OrganizationProfileModel.findOneAndUpdate({}, data, { new: true });
    }
    async totalProfiles() {
        return await OrganizationProfileModel.estimatedDocumentCount();
    }

    async getProfile() {
        return await OrganizationProfileModel.findOne();
    }
}

export const organizationProfileRepository = new OrganizationProfileRepository();
