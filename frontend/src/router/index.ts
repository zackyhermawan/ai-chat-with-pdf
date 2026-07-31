import { createRouter, createWebHistory } from "vue-router";
import ChatPage from "../pages/ChatPage.vue";
import LoginPage from "../pages/LoginPage.vue";
import RegisterPage from "../pages/RegisterPage.vue";
import { useAuthStore } from "../stores/auth.store.ts";

const router = createRouter({
    history: createWebHistory(),
    routes: [
        {
            path: "/login",
            component: LoginPage
        },
        {
            path: "/register",
            component: RegisterPage
        },
        {
            path: "/",
            component: ChatPage,
            meta: {
                requiresAuth: true
            }
        }
    ]
})

router.beforeEach(async(to) => {
    const authStore = useAuthStore()

    if(authStore.token && !authStore.user) {
        await authStore.getMe()
    }

    if(to.meta.requiresAuth && !authStore.isAuthenticated) {
        return "/login"
    }

    if(authStore.isAuthenticated && (to.path === "/login" || to.path === "/register")) {
        return "/"
    }
})

export default router