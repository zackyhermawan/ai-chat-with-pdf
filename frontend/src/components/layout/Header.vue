<script setup lang="ts">
import { ChevronDown, FileText, LogOut, Sparkles } from 'lucide-vue-next';
import { useDocumentStore } from '../../stores/document.store';
import { ref } from 'vue';
import { useAuthStore } from '../../stores/auth.store';
import { useRouter } from 'vue-router';

const documentStore = useDocumentStore()
const authStore = useAuthStore()
const open = ref(false)
const router = useRouter()

const handleLogout = () => {
  if (!window.confirm("Are you sure you want to sign out?")) return

  open.value = false

  authStore.logout()

  router.replace("/login")
}

</script>

<template>
  <header class="flex h-20 items-center justify-between border-b border-slate-800 bg-slate-950/70 px-8 backdrop-blur-md">
    <div>
      <p class="text-xs uppercase tracking-widest text-indigo-400">Active Document</p>

      <div class="mt-1 flex items-center gap-2">
        <FileText class="h-5 w-5 text-indigo-400" />
        <h2 class="text-lg font-semibold" :class="documentStore.selectedDocument?.id ? '' : 'italic text-gray-300'">{{ documentStore.selectedDocument?.title ?? "No document selected" }}</h2>
      </div>
    </div>

    <div class="flex items-center gap-4">
      <div class="flex items-center gap-2 rounded-full border border-slate-700 bg-slate-900 px-4 py-2">
        <Sparkles class="h-4 w-4 text-indigo-400" />
        <span class="text-sm text-slate-300">
          GPT-4.1 Mini
        </span>
      </div>
  
      <div class="relative">
        <button @click="open = !open" class="flex items-center gap-3 rounded-xl px-3 py-2 hover:bg-slate-800">
          <div class="flex h-10 w-10 items-center justify-center rounded-full bg-indigo-500 font-semibold">
            {{ authStore.user?.name.charAt(0).toUpperCase() }}
          </div>
  
          <ChevronDown class="h-4 w-4"/>
        </button>

        <div v-if="open" class="absolute right-0 mt-3 w-64 rounded-2xl border border-slate-800 bg-slate-900 shadow-xl">
          <div class="border-b border-slate-800 p-4">
              <p class="font-semibold">
                {{ authStore.user?.name }}
              </p>

              <p class="text-sm text-slate-400">
                {{ authStore.user?.email }}
              </p>
          </div>

          <button
              @click="handleLogout" class="flex w-full items-center gap-3 rounded-b-2xl px-4 py-3 text-red-400 hover:bg-slate-800">
              <LogOut class="h-4 w-4"/>

              Sign Out
          </button>
        </div>
  
      </div>
    </div>
  </header>
</template>