<script setup lang="ts">
import { SendHorizontal } from 'lucide-vue-next';
import { useChatStore } from '../../stores/chat.store';

const chatStore = useChatStore()

</script>

<template>

<div class="p-6">
    <div class="mx-auto flex max-w-4xl items-center rounded-3xl border border-slate-700 bg-slate-900 px-5 py-4 shadow-lg">
        <input v-model="chatStore.question" @keyup.enter="chatStore.sendMessage()" placeholder="Ask anything about your document..." class="flex-1 bg-transparent text-sm outline-none placeholder:text-slate-500"/>
        <button @click="chatStore.sendMessage()" :disabled="chatStore.isSending" class="ml-4 flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500 transition hover:scale-105 hover:bg-indigo-400">
            <SendHorizontal class="h-5 w-5"/>
        </button>
    </div>
</div>

</template>