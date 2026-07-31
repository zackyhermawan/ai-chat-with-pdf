<script setup lang="ts">
import { Bot } from 'lucide-vue-next';
import { RouterLink, useRouter } from 'vue-router';
import { useAuthStore } from '../stores/auth.store';
import { reactive } from 'vue';

const router = useRouter()
const authStore = useAuthStore()

const form = reactive({
    email: "",
    password: ""
})

const submit = async() => {
    await authStore.login(form.email, form.password)

    router.push("/")
}

</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-950 px-6">

    <div class="w-full max-w-md">

      <div class="mb-10 text-center">

        <div class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-500 shadow-lg shadow-indigo-500/30">
          <Bot class="h-10 w-10 text-white" />
        </div>

        <h1 class="text-3xl font-bold text-white">
          AI PDF Assistant
        </h1>

        <p class="mt-2 text-slate-400">
          Chat with your PDF using Artificial Intelligence
        </p>

      </div>


      <div class="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

        <h2 class="mb-6 text-white text-center text-2xl font-semibold">
          Welcome Back 👋
        </h2>

        <form @submit.prevent="submit" class="space-y-5">
            <p
            v-if="authStore.errorMessage"
            class="text-red-500 text-sm mt-2"
            >
            {{ authStore.errorMessage }}
            </p>

          <div>

            <label class="mb-2 block text-sm text-slate-400">
              Email
            </label>

            <input v-model="form.email" type="email" placeholder="john@email.com" class="w-full rounded-xl border text-slate-300 border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-indigo-500"/>

          </div>

          <div>

            <label class="mb-2 block text-sm text-slate-400">
              Password
            </label>

            <input v-model="form.password" type="password" placeholder="********" class="w-full rounded-xl border text-slate-300 border-slate-700 bg-slate-950 px-4 py-3 outline-none transition focus:border-indigo-500"/>

          </div>

          <button class="w-full rounded-xl bg-indigo-500 py-3 font-semibold transition hover:bg-indigo-400 disabled:opacity-50">
            {{ authStore.isLoading ? "Signing In..." : "Sign In" }}
          </button>

        </form>

        <p class="mt-8 text-center text-sm text-slate-400">

          Don't have an account?

          <RouterLink to="/register" class="font-semibold text-indigo-400 hover:text-indigo-300">
            Register
          </RouterLink>

        </p>

      </div>

    </div>

  </div>
</template>