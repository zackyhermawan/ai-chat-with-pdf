<script setup lang="ts">
import { Bot } from 'lucide-vue-next';
import { useAuthStore } from '../stores/auth.store';
import { reactive } from 'vue';
import { useRouter } from 'vue-router';

const authStore = useAuthStore()
const router = useRouter()
const form = reactive({
    name: "",
    email: "",
    password: ""
})

const submit = async() => {
    await authStore.register(form.name, form.email, form.password)

    router.push("/login")
}

</script>

<template>
  <div class="flex min-h-screen items-center justify-center bg-slate-950 px-6">

    <div class="w-full max-w-md">

      <div class="mb-10 text-center">

        <div class="mx-auto mb-5 flex h-20 w-20 items-center justify-center rounded-3xl bg-indigo-500 shadow-lg shadow-indigo-500/30">
          <Bot class="h-10 w-10 text-white"/>
        </div>

        <h1 class="text-3xl font-bold text-white">
          AI PDF Assistant
        </h1>

        <p class="mt-2 text-slate-400">
          Create your account
        </p>

      </div>

      <div class="rounded-3xl border border-slate-800 bg-slate-900 p-8 shadow-2xl">

        <h2 class="mb-6 text-center text-2xl font-semibold text-white">
          Register
        </h2>

        <form @submit.prevent="submit" class="space-y-5">

          <input v-model="form.name" placeholder="Full Name" class="w-full rounded-xl border text-slate-300 border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-indigo-500"/>

          <input v-model="form.email" type="email" placeholder="Email" class="w-full rounded-xl border text-slate-300 border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-indigo-500"/>

          <input v-model="form.password" type="password" placeholder="Password" class="w-full rounded-xl border text-slate-300 border-slate-700 bg-slate-950 px-4 py-3 outline-none focus:border-indigo-500"/>

          <button class="w-full rounded-xl bg-indigo-500 py-3 font-semibold transition hover:bg-indigo-400 disabled:opacity-50">
          {{ authStore.isLoading ? "Creating..." : "Create Accoung" }}
          </button>

        </form>

        <p class="mt-8 text-center text-sm text-slate-400">

          Already have an account?

          <RouterLink
            to="/login"
            class="font-semibold text-indigo-400 hover:text-indigo-300"
          >
            Login
          </RouterLink>

        </p>

      </div>

    </div>

  </div>
</template>