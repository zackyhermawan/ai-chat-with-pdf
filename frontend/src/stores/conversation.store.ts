import { defineStore } from "pinia";
import type { Conversation } from "../types/conversation";
import conversationService from "../services/conversation.service";
import type { Message } from "../types/message";

export const useConversationStore = defineStore("conversation", {
    state: ()=> ({
        conversations: [] as Conversation[],
        selectedConversation: null as Conversation | null,
        selectedMessage: null as Message[] | null,
        isLoading: false,
        editingConversationId: null as string | null
    }),

    actions: {
        async fetchConversations(documentId: string) {
            this.isLoading = true

            try {
                this.conversations = await conversationService.getAll(documentId)

                if(this.conversations.length > 0) {
                    await this.selectConversation(this.conversations[0])
                } else {
                    this.selectedConversation = null
                }

            } finally {
                this.isLoading = false
            }
        },

        async selectConversation(conversation: Conversation) {
            this.selectedConversation = conversation 
            
            await this.fetchMessages(this.selectedConversation.id)
        },

        async createConversation(documentId: string) {
            await conversationService.create(documentId)

            await this.fetchConversations(documentId)

            this.selectedConversation = this.conversations[0] 

            return this.selectedConversation
        },

        async renameConversation(id: string, title: string) {
            const conversation = await conversationService.rename(id, title)

            const index = this.conversations.findIndex(c => c.id === id)

            if(index !== -1) {
                this.conversations[index] = conversation
            }

            if(this.selectedConversation?.id === id) {
                this.selectedConversation = conversation
            }
        },

        async fetchMessages(id: string) {
            const data = await conversationService.getMessage(id)

            this.selectedMessage = data.messages
        },

        async removeConversation(id: string) {
            await conversationService.remove(id)

            this.conversations = this.conversations.filter(
                conversation => conversation.id !== id
            )

            if (this.selectedConversation?.id === id) {
                this.selectedConversation = this.conversations[0] ?? null
            }
        },

        startEditing(id: string) {
            this.editingConversationId = id
        },

        stopEditing() {
            this.editingConversationId = null
        },



    }
})