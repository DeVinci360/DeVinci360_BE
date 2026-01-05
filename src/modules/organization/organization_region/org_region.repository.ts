import { OrganizationRegionModel } from "./org_region.model";

class OrganizationRegionRepository {
    async createRegion(regionData: any) {
        return await OrganizationRegionModel.create(regionData);
    }
    async getExistingRegionByNameOrCode(regionName: string, regionCode: string,) {
        return await OrganizationRegionModel.exists({
            $or: [{ regionName: { $regex: new RegExp(`^${regionName.trim()}$`, "i") } }, { regionCode: { $regex: new RegExp(`^${regionCode.trim()}$`, "i") } }]
        });
    }
    async totalRegions() {
        return await OrganizationRegionModel.estimatedDocumentCount();
    }
    async regionList(filter?: any) {
        return await OrganizationRegionModel.find(filter).lean();
    }
    async deleteRegion(id: string) {
        return await OrganizationRegionModel.findByIdAndDelete(id);
    }
    async marAsDefault(id: string) {
        await OrganizationRegionModel.findOneAndUpdate({ isDefault: true }, { isDefault: false })
        return await OrganizationRegionModel.findByIdAndUpdate(id, { isDefault: true }, { new: true });
    }
    async updateRegion(id: string, regionData: any) {
        return await OrganizationRegionModel.findByIdAndUpdate(id, regionData, { new: true });
    }
}

export const organizationRegionRepository = new OrganizationRegionRepository();
