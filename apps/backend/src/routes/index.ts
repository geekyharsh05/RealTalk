import { Router } from "express";
import AuthRoutes from "./auth.route";
import MessageRoutes from "./message.route";
import { isAuthenticated } from "../middleware/auth.middleware";

const router: Router = Router();

router.use("/auth", AuthRoutes);
router.use("/messages", isAuthenticated, MessageRoutes);

export default router;
