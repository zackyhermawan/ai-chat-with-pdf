import { prisma } from "../lib/prisma.js"

export const createMessages = async(conversationId: string, role: "USER" | "ASSISTANT", content: string) => {
    return prisma.message.create({
        data: {
            conversationId,
            role,
            content
        }
    })
}

export const getRecentMessages = async(conversationId: string, limit = 10) => {
    return prisma.message.findMany({
        where: {
            conversationId
        },

        orderBy: {
            createdAt: "asc"
        },
        take: limit
    })
}

