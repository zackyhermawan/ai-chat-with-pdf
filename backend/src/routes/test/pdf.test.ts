import { Router } from "express";
import { loadPDF } from "../../rag/loader.js";

const router = Router()

router.get("/", async(_, res)=>{
    try {
        const doc = await loadPDF("uploads/PUI_Final_ch.pdf")

        return res.json({
            pages: doc.length,
            firstPage: doc[0]
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
})

export default router