import { chatModel } from "../lib/openai.js"
import { chatPrompt } from "../prompt/chat.prompt.js"
import { formatDocuments } from "../rag/context.js"
import { formatHistory } from "../rag/history.js"
import { getRetriever } from "../rag/retriever.js"
import { getConversationById } from "./conversation.service.js"
import { createMessages, getRecentMessages } from "./message.service.js"

export const loadConversation = async(userId: string, conversationId: string) => {
    const conversation = await getConversationById(conversationId, userId)

    if(!conversation) {
        throw new Error("Percakapan tidak ditemukan")
    }

    return conversation
} 

export const generateAnswer = async(conversationId: string, documentId: string, question: string) => {
    const historyMessages = await getRecentMessages(conversationId)

    const history = formatHistory(historyMessages)

    console.log(history)

    const retriever = await getRetriever(documentId)

    const documents = await retriever.invoke(question)

    const context = formatDocuments(documents)

    const prompt = await chatPrompt.invoke({history, context, question})

    const response = await chatModel.invoke(prompt)

    console.log(response)

    return response.text

}

export const persistMessages = async(conversationId: string, question: string, answer: string) => {
    const user = await createMessages(
        conversationId,
        "USER",
        question
    )

    const assistant = await createMessages(
        conversationId,
        "ASSISTANT",
        answer
    )

    return {
        user,
        assistant
    }
}

export const askQuestion = async(conversationId: string, question: string, userId: string) => {
    const conversation = await loadConversation(userId, conversationId)

    const answer = await generateAnswer(conversationId, conversation.documentId, question)

    const message = await persistMessages(conversationId, question, answer)

    return message
}