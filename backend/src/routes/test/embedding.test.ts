import { Router } from "express"
import { loadPDF } from "../../rag/loader.js"
import { splitter } from "../../rag/splitter.js"
import { embeddings } from "../../lib/openai.js"


const router = Router()

router.get("/", async(_, res)=>{
    try {
        const vector = await embeddings.embedQuery("Apa itu artificial intelegent?")

        return res.json({
            dimension: vector.length
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
})

export default router