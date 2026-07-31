import api from "../api/axios";

class AuthService {
    async register(name: string, email: string, password: string){
        const response = await api.post("/auth/register", {
            name,
            email,
            password
        })

        return response.data
    }

    async login(email: string, password: string) {
        const response = await api.post("/auth/login", {
            email,
            password
        })

        return response.data
    }

    async me() {
        const response = await api.get("/auth/me")

        return response.data
    }
}

export default new AuthService()