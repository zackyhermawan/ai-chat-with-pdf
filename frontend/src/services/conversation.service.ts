import api from "../api/axios";

class ConversationService {
    async getAll(documentId: string) {
        const response = await api.get(`/conversations/documents/${documentId}`)

        return response.data.data
    }

    async create(documentId: string) {
        const response = await api.post(`/conversations/documents/${documentId}`)

        return response.data.data
    }

    async rename(id: string, title: string) {
        const response = await api.patch(`/conversations/documents/${id}`, {title})

        return response.data.data
    }

    async remove(id: string) {
        await api.delete(`/conversations/${id}`)
    }

    async getMessage(id: string) {
        const response = await api.get(`/conversations/${id}`)

        return response.data.data
    }
}

export default new ConversationService()