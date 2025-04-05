import { Router } from "express";
import { MessageController } from "../controllers/message.controller";

const router: Router = Router();
const messageController = new MessageController();

router.get("/users", messageController.getUsersForSidebar);
router.get("/:id", messageController.getMessages);
router.post("/send/:id", messageController.sendMessage);

export default router;
