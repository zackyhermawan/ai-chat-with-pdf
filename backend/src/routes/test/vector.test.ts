import { Router } from "express";
import { getVectorStore } from "../../rag/vectorStore.js";

const router = Router()

router.get("/", async(_, res) => {
    try {
        await getVectorStore()

        return res.json({
            message: "Connected to PGVector"
        })
    } catch (error: any) {
        console.log(error)

        return res.status(500).json({
            message: error.message
        })
    }
})

export default router