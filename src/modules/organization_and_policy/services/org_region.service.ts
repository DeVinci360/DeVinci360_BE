import { organizationRegionRepository } from "../repositories/org_region.repository";
import { validateId } from "../utils";

class OrganizationRegionService {
    private validateRegionId(id: string) {
        validateId(id, "Invalid region id");
    }
    async createRegion(regionData: any) {
        const [existingRegion, totalRegions] = await Promise.all([
            organizationRegionRepository.getExistingRegionByNameOrCode(regionData.regionName, regionData.regionCode),
            organizationRegionRepository.totalRegions()
        ]);
        if (existingRegion) {
            throw new Error("Region already exists");
        }
        if (totalRegions === 0) {
            regionData.isDefault = true;
        }
        return await organizationRegionRepository.createRegion(regionData);
    }

    async regionList() {
        const [regions, totalRegions] = await Promise.all([
            organizationRegionRepository.regionList(),
            organizationRegionRepository.totalRegions()
        ]);
        return { regions, totalRegions };
    }

    async deleteRegion(id: string) {
        this.validateRegionId(id);
        return await organizationRegionRepository.deleteRegion(id);
    }

    async marAsDefault(id: string) {
        this.validateRegionId(id);
        return await organizationRegionRepository.marAsDefault(id);
    }

    async updateRegion(id: string, regionData: any) {
        this.validateRegionId(id);
        const existingRegion = await organizationRegionRepository.getExistingRegionByNameOrCode(regionData.regionName, regionData.regionCode);
        if (existingRegion && existingRegion._id.toString() !== id) {
            throw new Error("This region already exists");
        }
        return await organizationRegionRepository.updateRegion(id, regionData);
    }
}

export const organizationRegionService = new OrganizationRegionService();