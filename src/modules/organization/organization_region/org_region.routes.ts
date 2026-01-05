import { Router } from "express";
import { organizationRegionController } from "./org_region.controller";
import { validate } from "../../../common/middlewares/validate.middleware";
import { orgRegionSchema } from "./org_region.schema";

const router = Router();

router.post("/create", validate(orgRegionSchema), organizationRegionController.createRegion);
router.get("/list", organizationRegionController.regionList);
router.delete("/:id", organizationRegionController.deleteRegion);
router.put("/:id", validate(orgRegionSchema), organizationRegionController.updateRegion);
router.patch("/:id/mark-as-default", organizationRegionController.marAsDefault);

export default router;