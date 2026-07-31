import { Request, Response } from "express";
import path from "path";
import { createDocument, deleteDocument, getDocuments } from "../services/document.service.js";
import { addEmbeddingJob } from "../services/queue.service.js";

export const uploadDocument = async(req: Request, res: Response) => {
    try {
        if(!req.file) {
            return res.status(400).json({
                message: "PDF File is Required!"
            })
        }

        const title = path.parse(req.file.originalname).name

        const userId = req.user?.id

        const document = await createDocument(userId as string, title, req.file.filename)

        await addEmbeddingJob(document.id)

        return res.status(201).json({
            message: "Document uploaded successfully",
            data: document
        })
    } catch (error) {
        console.log(error)

        return res.status(500).json({
            message: "Internal server error!"
        })
    }
}

export const findAll = async(req: Request, res: Response) => {
    try {
        const response = await getDocuments(req.user?.id as string)

        return res.status(200).json({
            message: "Data berhasil diambil",
            data: response
        })
    } catch (error: any) {
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
        await deleteDocument(id  as string, req.user?.id as string)

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