import { Message } from "@prisma/client";

export const formatHistory = (messages: Message[]) => {
    return messages.map(message => {
        return `${message.role}: ${message.content}`
    }).join("\n\n")
}