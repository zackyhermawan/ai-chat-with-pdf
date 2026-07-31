import { Router } from "express"
import { loadPDF } from "../../rag/loader.js"
import { splitter } from "../../rag/splitter.js"

const router = Router()

router.get("/", async(_, res)=>{
    try {
        const doc = await loadPDF("uploads/PUI_Final_ch.pdf")

        const chunk = await splitter.splitDocuments(doc)
        return res.json({
            pages: doc.length,
            chunk: chunk.length,
            firstChunk: chunk[0]
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
})

export default router