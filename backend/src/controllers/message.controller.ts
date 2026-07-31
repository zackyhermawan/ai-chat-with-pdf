import { Request, Response } from "express";
import { getRecentMessages } from "../services/message.service.js";

export const recentMessages = async(req: Request, res: Response) => {
    try {
        const {conversationId} = req.body
        const response = await getRecentMessages(conversationId)

        return res.status(200).json({
            message: "Berhasil mengambil data",
            data: response
        })
    } catch(error: any) {
        console.log(error)

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}