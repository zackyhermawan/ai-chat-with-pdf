import { Router } from "express";
import { create, findByDocumentId, findConversationById, remove, renameTitle, } from "../controllers/conversation.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router()

router.use(authenticate)
// router.post("/open", open)
router.post("/documents/:documentId", create)
router.get("/:id", findConversationById)
router.get("/documents/:documentId", findByDocumentId)
router.patch("/documents/:id", renameTitle)
router.delete("/:id", remove)

export default router