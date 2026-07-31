<script setup lang="ts">
import {
  MessageCircle,
} from "lucide-vue-next";

defineProps<{

active?:boolean

}>()
</script>

<template>

  <div :class="['cursor-pointer rounded-xl border p-3 transition-all duration-200', active ? 'border-indigo-500 bg-indigo-500/20' : 'border-slate-800 hover:-translate-y-1 hover:border-indigo-500 hover:bg-slate-800']">

    <div class="flex items-center gap-3">
      <MessageCircle class="h-5 w-5"/>

      <div>

        <p class="text-sm font-medium">Chat with PDF</p>

        <p class="text-xs text-slate-500">Yesterday</p>

      </div>

    </div>

  </div>

</template>