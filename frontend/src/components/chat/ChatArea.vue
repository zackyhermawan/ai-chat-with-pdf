<script setup lang="ts">
import { useChatStore } from '../../stores/chat.store.ts';
import { useConversationStore } from '../../stores/conversation.store.ts';
import Header from '../layout/Header.vue';
import ChatInput from './ChatInput.vue';
import EmptyState from './EmptyState.vue';
import MessageList from './MessageList.vue';

const conversationStore = useConversationStore()
const chatStore = useChatStore()

</script>

<template>
  <div class="flex h-screen flex-1 flex-col bg-slate-950">

    <Header />

    <div v-if=" conversationStore.selectedConversation && conversationStore.selectedMessage?.length === 0 && !chatStore.isSending" class="flex h-2/3 items-center justify-center px-8 ">
      <p class=" text-slate-400">No conversation yet</p>
    </div>
    <EmptyState v-if="conversationStore.conversations.length === 0"/>
    <MessageList v-else/>

    <ChatInput v-if="conversationStore.conversations.length !== 0" />

  </div>
</template>