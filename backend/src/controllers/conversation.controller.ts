import { Request, Response } from "express";
import { createConversation, deleteConversation, getConversationByDocumentId, getConversationById, updateTitle, } from "../services/conversation.service.js";

export const create = async(req: Request, res: Response) => {
    try {
        const {documentId} = req.params

        const response = await createConversation(documentId as string, req.user?.id as string)

        return res.status(201).json({
            message: "Berhasil membuat percakapan",
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

export const findByDocumentId = async(req: Request, res: Response) => {
    try {
        const { documentId } = req.params

        const response = await getConversationByDocumentId(documentId as string, req.user?.id as string)
        
        return res.status(200).json({
            message: "Data berhasil diambil",
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

export const renameTitle = async(req: Request, res: Response) => {
    try {
        const { id } = req.params
        const { title } = req.body

        const response = await updateTitle(id as string, title)
        
        return res.status(200).json({
            message: "Title berhasil diperbarui",
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

export const findConversationById = async(req: Request, res: Response) => {
    try {
        const {id} = req.params

        const response = await getConversationById(id as string, req.user?.id as string)

        console.log(response?.messages)

        return res.status(200).json({
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

export const remove = async(req: Request, res: Response) => {
    try {
        const { id } = req.params
        await deleteConversation(id as string, req.user?.id as string)

        return res.status(200).json({
            message: "Data berhasil dihapus",
        })
    } catch (error: any) {
        console.log(error)

        return res.status(500).json({
            message: "Internal server error",
            error: error.message
        })
    }
}

// export const open = async(req: Request, res: Response) => {
//     try {
//         const {documentId} = req.body

//         const response = await openConversation(documentId)

//         return res.status(201).json({
//             message: "Percakapan pertama berhasil dibuat",
//             data: response
//         })
//     } catch(error: any) {
//         console.log(error)

//         return res.status(500).json({
//             message: "Internal server error",
//             error: error.message
//         })
//     }
// }

// export const findAll = async(req: Request, res: Response) => {
//     try {
//         const conversations = await getConversations()

//         return res.status(200).json({
//             message: "Data berhasil diambil",
//             data: conversations
//         })
//     } catch(error: any) {
//         console.log(error)

//         return res.status(500).json({
//             message: "Internal server error",
//             error: error.message
//         })
//     }
// }