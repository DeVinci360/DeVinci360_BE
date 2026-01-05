import { OrganizationRegionModel } from "./org_region.model";

class OrganizationRegionRepository {
    async createRegion(regionData: any) {
        return await OrganizationRegionModel.create(regionData);
    }
    async getExistingRegionByNameOrCode(regionName: string, regionCode: string,) {
        return await OrganizationRegionModel.exists({
            $or: [{ regionName: regionName.trim() }, { regionCode: regionCode.trim() }]
        });
    }
    async totalRegions() {
        return await OrganizationRegionModel.estimatedDocumentCount();
    }
    async getRegionByNameOrCode(regionName: string, regionCode: string,) {
        return await OrganizationRegionModel.findOne({
            $or: [{ regionName }, { regionCode }]
        }).lean();
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
