import { Router } from "express";
import { recentMessages } from "../controllers/message.controller.js";

const router = Router()

router.get("/recent", recentMessages)

export default router