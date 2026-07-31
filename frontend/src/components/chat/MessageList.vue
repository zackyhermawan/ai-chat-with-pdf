<script setup lang="ts">
import { Bot, Check, Copy, User } from 'lucide-vue-next';
import { ref, watch } from 'vue';
import { useConversationStore } from '../../stores/conversation.store';
import { useChatStore } from '../../stores/chat.store';
import { nextTick } from 'vue';

const conversationStore = useConversationStore()
const chatStore = useChatStore()
const bottom = ref()

const copied = ref(false)

const copy = async(content: string) => {
    await navigator.clipboard.writeText(content)

    copied.value = true

    setTimeout(() => {
        copied.value = false
    }, 2000);
}

watch(
    [
        ()=> conversationStore.selectedMessage?.length,
        ()=> chatStore.isSending
    ],
    async()=> {
        await nextTick()

        bottom.value?.scrollIntoView({
            behavior: "smooth"
        })
    }
)


</script>

<template>
    
    <div class="flex-1 overflow-y-auto py-6">
        <div v-for="message in conversationStore.selectedMessage" :key="message.id" class="mx-auto flex w-full max-w-4xl gap-4 px-6 py-6">
            <div class="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl" :class="message.role === 'ASSISTANT' ? 'bg-indigo-500' : 'bg-slate-700'">
                <Bot
                    v-if="message.role === 'ASSISTANT'"
                    class="h-5 w-5"
                />

                <User
                    v-else
                    class="h-5 w-5"
                />
            </div>

            <div class="flex-1">

                <div class="mb-2 flex items-center justify-between">
                    <h3 class="font-semibold">{{ message.role === "ASSISTANT" ? "Assistant" : "You" }}</h3>
                        <button @click="copy(message.content)" class="rounded-lg p-2 text-slate-400 transition hover:bg-slate-800 hover:text-white">
                        <Check v-if="copied" class="h-4 w-4"/>

                        <Copy v-else class="h-4 w-4"/>
                    </button>

                </div>

                <div class="rounded-2xl border border-slate-800 bg-slate-900 p-5 leading-8 text-slate-200">
                    {{ message.content }}
                </div>

            </div>

        </div>

        <div v-if="chatStore.isSending" class="mx-auto flex w-full max-w-4xl gap-4 px-6 py-6">

            <div class="flex h-11 w-11 items-center justify-center rounded-2xl bg-indigo-500"\ >🤖</div>

            <div class="flex items-center gap-2 rounded-2xl border border-slate-800 bg-slate-900 px-6 py-5">

            <span class="h-2 w-2 animate-bounce rounded-full bg-slate-400"></span>

            <span class="h-2 w-2 animate-bounce rounded-full bg-slate-400" style="animation-delay:.15s"></span>

            <span class="h-2 w-2 animate-bounce rounded-full bg-slate-400" style="animation-delay:.3s"></span>

            </div>

        </div>
            
        <div ref="bottom"></div>
    </div>
</template>