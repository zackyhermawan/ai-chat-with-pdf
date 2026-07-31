import api from "../api/axios"


class DocumentService {
    async getAll() {
        const response = await api.get("/documents")

        return response.data.data
    }

    async upload(file: File) {
        const formData = new FormData()
        formData.append("file", file)

        const response = await api.post("/documents/upload", formData, {
            headers: {
                "Content-Type": "multipart/form-data"
            }
        })

        return response.data.data
    }

    async delete(id: string) {
        await api.delete(`/documents/${id}`)
    }
}

export default new DocumentService()