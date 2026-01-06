import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import { authenticate } from "../common/middlewares/auth.middleware";
import {
    organizationRegionRouter,
    organizationProfileRouter,
    regionalSettingsRouter,
    workScheduleRouter,
    leavePolicyRouter,
} from "../modules/organization_and_policy/routes";
import { roleCategoryRouter, roleRouter } from "../modules/auth_and_identity/routes";
const router = Router();

router.get("/health", (_, res) => {
    res.json({ status: "OK" });
});

router.use("/auth", authRoutes);
router.use("/user", authenticate, userRoutes);
router.use("/organization/region", organizationRegionRouter);
router.use("/organization/profile", organizationProfileRouter);
router.use("/organization/regional-settings", regionalSettingsRouter);
router.use("/organization/work-schedule", workScheduleRouter);
router.use("/organization/leave-policy", leavePolicyRouter);
router.use("/role-category", roleCategoryRouter);
router.use("/role", roleRouter);

export default router;
