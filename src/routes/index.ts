import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import { authenticate } from "../common/middlewares/auth.middleware";
import orgnizationRegionRoutes from "../modules/organization/organization_region/org_region.routes";
import organizationProfileRoutes from "../modules/organization/organization_profile/org_profile.routes"; // Import new routes
import regionalSettingsRoutes from "../modules/organization/regional_settings/regional_settings.routes";
import workScheduleRoutes from "../modules/organization/work_schedule/work_schedule.routes";

const router = Router();

router.get("/health", (_, res) => {
    res.json({ status: "OK" });
});

router.use("/auth", authRoutes);
router.use("/user", authenticate, userRoutes);
router.use("/organization/region", orgnizationRegionRoutes);
router.use("/organization/profile", organizationProfileRoutes);
router.use("/organization/regional-settings", regionalSettingsRoutes);
router.use("/organization/work-schedule", workScheduleRoutes);

export default router;
