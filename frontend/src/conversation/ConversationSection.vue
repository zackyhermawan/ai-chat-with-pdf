<script setup lang="ts">
import {
  MessageCircle,
  Pencil,
  Plus,
  Trash2,
} from "lucide-vue-next";
import { useConversationStore } from "../stores/conversation.store";
import { useDocumentStore } from "../stores/document.store";
import { nextTick, ref, watch } from "vue";
import type { Conversation } from "../types/conversation";


const conversationStore = useConversationStore()
const documentStore = useDocumentStore()
const editingTitle = ref("")
const inputRef = ref<HTMLInputElement | null>(null)

const createConversation = async() => {
  if(!documentStore.selectedDocument) return

  const conversation = await conversationStore.createConversation(documentStore.selectedDocument.id)

  if (!conversation) return

  editingTitle.value = conversation.title

  conversationStore.startEditing(conversation.id)
}

const startEdit = async (conversation: Conversation) => {
  conversationStore.startEditing(conversation.id)

  editingTitle.value = conversation.title

  await nextTick()

  inputRef.value?.focus()
  inputRef.value?.select()
}

const saveEdit = async(conversationId: string) => {
  const title = editingTitle.value.trim()

  if (!title) {
    conversationStore.stopEditing()
    return
  }

  await conversationStore.renameConversation(conversationId, title)

  conversationStore.stopEditing()
}

const deleteConversation = async(conversation: {id: string, title: string}) => {
  const confirm = window.confirm(`Delete ${conversation.title}?`)

  if(!confirm) return

  await conversationStore.removeConversation(conversation.id)
}

watch(
  () => conversationStore.editingConversationId,
  async () => {
    await nextTick()

    const input = document.querySelector(
      "input[data-editing='true']"
    ) as HTMLInputElement | null

    if (!input) return

    input.focus()
    input.select()
  }
)
</script>

<template>

  <section class="flex h-full flex-col">

    <div class="flex items-center justify-between p-5">

      <h2 class="font-semibold">Conversations</h2>

      <button @click="createConversation" class="rounded-lg bg-indigo-500 p-2 transition hover:bg-indigo-400">

        <Plus class="h-4 w-4"/>

      </button>

    </div>

    <div class="flex-1 space-y-3 overflow-y-auto px-5 pb-5">
      <div v-for="conversation in conversationStore.conversations" :key="conversation.id" @click="conversationStore.selectConversation(conversation)" :class="['flex items-center justify-between cursor-pointer rounded-xl border p-3 transition-all duration-200 group', conversationStore.selectedConversation?.id === conversation.id ? 'border-indigo-500 bg-indigo-500/20' : 'border-slate-800 hover:border-indigo-500 hover:bg-slate-800']">
        <div class="flex min-w-0 flex-1 items-center gap-3">
          <MessageCircle class="h-5 w-5" />

          <div class="flex min-w-0 flex-1 flex-col">

            <input
              v-if="conversationStore.editingConversationId === conversation.id"
              data-editing="true"
              v-model="editingTitle"
              @click.stop
              @keyup.enter="saveEdit(conversation.id)"
              @blur="saveEdit(conversation.id)"
              class="w-full bg-transparent text-sm font-medium outline-none"
            />

            <p
              v-else
              class="truncate text-sm font-medium"
              :title="conversation.title"
            >
              {{ conversation.title }}
            </p>

            <p class="text-xs text-slate-500">
              {{ new Date(conversation.createdAt).toLocaleDateString() }}
            </p>

          </div>
        </div>

        <div class="flex items-center gap-3">
          <button @click.stop="startEdit(conversation)" class="rounded p-1 text-slate-500 opacity-0 transition hover:bg-indigo-500/10 hover:text-indigo-400 group-hover:opacity-100">
              <Pencil class="h-4 w-4"/>
          </button>
          <button @click.stop="deleteConversation(conversation)" class="rounded p-1 text-slate-500 opacity-0 transition hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100">
            <Trash2 class="w-4 h-4"/>
          </button>
        </div>

      </div>
    </div>

  </section>

</template>