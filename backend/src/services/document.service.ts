import path from "path"
import { prisma } from "../lib/prisma.js"
import { loadPDF } from "../rag/loader.js"
import { splitter } from "../rag/splitter.js"
import { getVectorStore } from "../rag/vectorStore.js"
import { deleteDocumentVector } from "../rag/delete-vector.js"
import { deleteFile } from "../utils/file.js"

export const createDocument = async(userId: string, title: string, filename: string) => {
    return prisma.document.create({
        data: {
            userId,
            title,
            filename
        }
    })
}

export const getDocuments = async(userId: string) => {
    return prisma.document.findMany({
        where: {
            userId
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

export const getDocumentById = async(id: string) => {
    return prisma.document.findUnique({
        where: {
            id
        }
    })
}

export const updateDocument = async(id: string, status: "PROCESSING" | "READY" | "FAILED") => {
    return prisma.document.update({
        where: {
            id
        },
        data: {
            status,
        }
    })
}

export const processDocument = async(documentId: string) => {

        const document = await getDocumentById(documentId)
    
        if(!document) {
            throw new Error("Document not found")
        }
    
        const filePath = path.join("uploads", document.filename)
    
        const docs = await loadPDF(filePath)
    
        const chunks = await splitter.splitDocuments(docs)
    
        console.log(`Created ${chunks.length} chunks`)
    
        const documents = chunks.map((chunk, index) => ({
            ...chunk,
            metadata: {
                documentId,
                source: document.title,
                filename: document.filename,
                page: chunk.metadata?.loc?.pageNumber ?? null,
                chunkIndex: index
    
            }
        }))
    
        const vectorStore = await getVectorStore()
    
        await vectorStore.addDocuments(documents)
    
        console.log("Embedding stored")
    
        await updateDocument(documentId, "READY")
    
        console.log("Document Ready")
}

export const deleteDocument = async(id: string, userId: string) => {
    const document = await prisma.document.findFirst({
        where: {
            id,
            userId
        }
    })

    if(!document) {
        throw new Error("Dokumen tidak ditemukan")
    }

    await deleteDocumentVector(id)

    const filePath = path.join(
        process.cwd(),
        "uploads",
        document.filename
    )

    await deleteFile(filePath)

    await prisma.document.delete({
        where: {
            id
        }
    })
}