import { Request, Response } from "express";
import { askQuestion } from "../services/chat.service.js";

export const chat = async(req: Request, res: Response) => {
    try {

        console.log(req.body)
        const { conversationId, question } = req.body

        const answer = await askQuestion(conversationId, question, req.user?.id as string)

        return res.json(answer)
    } catch(error: any) {
        console.log(error)

        return res.status(500).json({
            error: error.message
        })
    }
}