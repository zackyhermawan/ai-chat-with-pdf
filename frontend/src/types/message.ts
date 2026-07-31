export interface Message {
    id: string
    conversationId: string
    role: "USER" | "ASSISTANT"
    content: string
    createdAt: string
    updatedAt: string
}