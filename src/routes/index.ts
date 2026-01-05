import { Router } from "express";
import authRoutes from "../modules/auth/auth.routes";
import userRoutes from "../modules/user/user.routes";
import { authenticate } from "../common/middlewares/auth.middleware";
import orgnizationRegionRoutes from "../modules/organization/organization_region/org_region.routes";
const router = Router();

router.get("/health", (_, res) => {
    res.json({ status: "OK" });
});

router.use("/auth", authRoutes);
router.use("/user", authenticate, userRoutes);
router.use("/organization/region", orgnizationRegionRoutes);

export default router;
