import { Router } from "express";
import AuthRoutes from "./auth.route"

const router: Router = Router();

router.use("/auth", AuthRoutes);
// router.use("/message", isAuthenticated, MessageRoutes);

export default router;