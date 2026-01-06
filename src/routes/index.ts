import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import { authenticate } from "../common/middlewares/auth.middleware";
import orgnizationRegionRoutes from "../modules/organization_and_policy/routes/org_region.routes";
import organizationProfileRoutes from "../modules/organization_and_policy/routes/org_profile.routes"; // Import new routes
import regionalSettingsRoutes from "../modules/organization_and_policy/routes/regional_settings.routes";
import workScheduleRoutes from "../modules/organization_and_policy/routes/work_schedule.routes";
import leavePolicyRoutes from "../modules/organization_and_policy/routes/leave_policy.routes";

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
router.use("/organization/leave-policy", leavePolicyRoutes);

export default router;
