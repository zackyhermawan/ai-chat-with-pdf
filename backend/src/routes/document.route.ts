import { Router } from "express";
import { upload } from "../middlewares/upload.js";
import { findAll, remove, uploadDocument } from "../controllers/document.controller.js";
import { authenticate } from "../middlewares/auth.middleware.js";

const router = Router()

router.use(authenticate)

router.post("/upload", upload.single("file"), uploadDocument)
router.get("/", findAll)
router.delete("/:id", remove)

export default router