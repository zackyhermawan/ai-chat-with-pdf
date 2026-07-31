import api from "../api/axios";

class ChatService {
    async send(conversationId: string, question: string) {
        const response = await api.post(`/chats`, {conversationId, question})

        return response.data
    }
}

export default new ChatService()