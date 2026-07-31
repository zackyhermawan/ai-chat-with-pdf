import { defineStore } from "pinia";
import documentService from "../services/document.service";
import type { Document } from "../types/document";
import { useConversationStore } from "./conversation.store";

export const useDocumentStore = defineStore("document", {
    state: () => ({
        documents: [] as Document[],
        selectedDocument: null as Document | null,
        isLoading: false,
        isLoadingUpload: false,
        polling: null as ReturnType<typeof setInterval> | null
    }),

    actions: {
        async fetchDocument() {
            this.isLoading = true

            try {
                this.documents = await documentService.getAll()

                

                const processing = this.documents.some(
                    document => document.status === "PROCESSING"
                )

                if (processing) {
                    this.startPolling()
                }
            } finally {
                this.isLoading = false
            }
        },

        async selectDocument(document: Document) {
            this.selectedDocument = document

            const conversationStore = useConversationStore()

            await conversationStore.fetchConversations(document.id)

        },

        async upload(file: File) {
            this.isLoadingUpload = true

            try {
                const document = await documentService.upload(file)

                this.documents.unshift(document)

                this.startPolling()
            } finally {
                this.isLoadingUpload = false
            }
        },

        async remove(id: string) {
            await documentService.delete(id)

            await this.fetchDocument()

            const conversationStore = useConversationStore()
            
            if(this.selectedDocument?.id === id) {
                this.selectedDocument = null
                conversationStore.conversations = []
            }
        },

        startPolling() {
            if(this.polling) return

            this.polling = setInterval(async() => {
                await this.fetchDocument()

                const processing = this.documents.some(document => document.status === "PROCESSING")

                if(!processing) {
                    this.stopPolling()
                }
            }, 2000);
        },

        stopPolling() {
            if(!this.polling) return

            clearInterval(this.polling)

            this.polling = null
        }
    }
})