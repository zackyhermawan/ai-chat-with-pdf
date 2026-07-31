import { prisma } from "../lib/prisma.js"

export const createConversation = async(documentId: string, userId: string) => {
    const document = await prisma.document.findFirst({
        where: {
            id: documentId,
            userId
        }
    })

    if(!document) {
        throw new Error("Dokumen tidak ditemukan")
    }

    return prisma.conversation.create({
        data: {
            documentId,
            title: "New chat"
        }
    })
}

export const getConversationByDocumentId = async(documentId: string, userId: string) => {
    return prisma.conversation.findMany({
        where: {
            documentId,

            document: {
                userId
            }
        },
        orderBy: {
            createdAt: "desc"
        }
    })
}

export const updateTitle = async(conversationId: string, title: string) => {
    return prisma.conversation.update({
        where: {
            id: conversationId
        },
        data: {
            title: title
        }
    })
}

export const getConversationById = async(id: string, userId: string) => {
    return prisma.conversation.findFirst({
        where: {
            id,
            document: {
                userId
            }
        },
        include: {
            messages: true
        },

    })
}

export const deleteConversation = async(id: string, userId: string) => {
    return prisma.conversation.delete({
        where: {
            id,
            document: {
                userId
            }
        }
    })
}

