<script setup lang="ts">
import { onMounted } from 'vue';
import { RouterView } from 'vue-router';
import { useAuthStore } from './stores/auth.store';

const authStore = useAuthStore()

onMounted(async () => {
  await authStore.getMe()
})
</script>

<template>
  <RouterView/>
</template>
