import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import { authenticate } from "../common/middlewares/auth.middleware";
import orgnizationRegionRoutes from "../modules/organization/organization_region/org_region.routes";
import organizationProfileRoutes from "../modules/organization/organization_profile/org_profile.routes"; // Import new routes

const router = Router();

router.get("/health", (_, res) => {
    res.json({ status: "OK" });
});

router.use("/auth", authRoutes);
router.use("/user", authenticate, userRoutes);
router.use("/organization/region", orgnizationRegionRoutes);
router.use("/organization/profile", organizationProfileRoutes);

export default router;
