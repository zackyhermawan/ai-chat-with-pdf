import { Router } from "express"
import { chatModel } from "../../lib/openai.js"


const router = Router()

router.get("/", async(_, res)=>{
    try {
        const response = await chatModel.invoke("Halo, perkenalkan dirimu!")

        return res.json({
            response: response.content
        })
    } catch (error: any) {
        return res.status(500).json({
            message: error.message
        })
    }
})

export default router