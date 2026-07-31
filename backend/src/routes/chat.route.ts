import { Router } from "express";
import { chat } from "../controllers/chat.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router()

router.post("/", authenticate, chat)

export default router