import { defineStore } from "pinia";
import type { User } from "../types/user";
import authService from "../services/auth.service";
import { useDocumentStore } from "./document.store";
import { useConversationStore } from "./conversation.store";

export const useAuthStore = defineStore("auth", {
    state: ()=> ({
        user: null as User | null,
        token: localStorage.getItem("token") || "",
        isLoading: false,
        errorMessage: ""
    }),

    getters: {
        isAuthenticated: (state) => !!state.token
    },

    actions: {
        async register(
            name: string,
            email: string,
            password: string) {

            this.isLoading = true
            this.errorMessage = ""

            try {
                const response = await authService.register(name, email, password)

                this.errorMessage = ""

                localStorage.setItem("token", response.token)

                this.token = response.token

                this.user = response.user
            } catch(error: any) {
                this.errorMessage = error.response?.data?.error
            } finally {
                this.isLoading = false
            }
        },

        async login(email: string, password: string) {
            this.isLoading = true

            try {
                const response = await authService.login(email, password)

                this.errorMessage = ""

                localStorage.setItem("token", response.token)

                this.token = response.token

                this.user = response.user
            } catch(error: any) {
                this.errorMessage = error.response?.data?.message
            } finally {
                this.isLoading = false
            }
        },

        async getMe() {
            if(!this.token) return

            try {
                this.user = await authService.me()
            } catch {
                this.logout()
            }
        },

        logout() {
            localStorage.removeItem("token")

            this.user = null

            this.token = ""

            const documentStore = useDocumentStore()
            const conversationStore = useConversationStore()

            documentStore.$reset()
            conversationStore.$reset()
        }
    }
})