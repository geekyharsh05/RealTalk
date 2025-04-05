import { Router } from "express";
import { AuthController } from "../controllers/auth.controller";
import { isAuthenticated } from "../middleware/auth.middleware";

const router: Router = Router();
const authController = new AuthController();

router.post("/signup", authController.signUp);
router.post("/signin", authController.signIn);
router.post("/signout", authController.signOut);
router.get("/me", isAuthenticated, authController.getUser);
router.put("/update-profile", isAuthenticated, authController.updateProfile);

export default router;
