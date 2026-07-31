import { defineStore } from "pinia";
import { useConversationStore } from "./conversation.store";
import chatService from "../services/chat.service";

export const useChatStore = defineStore("chat", {
    state: ()=> ({
        question: "",
        isSending: false
    }),

    actions: {
        async sendMessage() {
            if(!this.question.trim()) return

            const conversationStore = useConversationStore()

            const conversation = conversationStore.selectedConversation

            if(!conversation) return

            const question = this.question

            this.question = ""

            this.isSending = true

            try {
                await chatService.send(conversation.id, question)

                await conversationStore.fetchMessages(conversation.id)
            } finally {
                this.isSending = false
            }
        }
    }
})