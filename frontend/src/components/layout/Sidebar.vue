<script setup lang="ts">
import { Bot } from 'lucide-vue-next';
import DocumentSection from '../document/DocumentSection.vue';
import ConversationSection from '../../conversation/ConversationSection.vue';

</script>

<template>
  <aside class="flex w-80 flex-col border-r border-slate-800 bg-slate-900">
    <div class="border-b border-slate-800 p-6">

      <div class="flex items-center gap-3">

        <div class="flex h-12 w-12 items-center justify-center rounded-2xl bg-indigo-500">
          <Bot class="h-6 w-6" />
        </div>

        <div>

          <h1 class="text-lg font-bold">
            AI PDF Assistant
          </h1>

          <p class="text-sm text-slate-400">
            Chat with your documents
          </p>

        </div>

      </div>
      

    </div>

    <div class="flex flex-1  flex-col overflow-hidden">

      <DocumentSection />

    </div>
    <div class="flex flex-1 flex-col overflow-hidden">

      <ConversationSection />

    </div>


    <div class="border-t border-slate-800 p-4 text-center text-xs text-slate-500">🚀AI Chat with PDF Powered by AI • Built with Vue.js & Node.js 2026 &copy; All rights reserved.</div>

  </aside>
</template>