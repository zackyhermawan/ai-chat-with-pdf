<script setup lang="ts">
import ChatArea from '../components/chat/ChatArea.vue';
import Sidebar from '../components/layout/Sidebar.vue';
import DefaultLayout from '../layouts/DefaultLayout.vue';

</script>

<template>
    <DefaultLayout>

        <Sidebar/>

        <ChatArea/>

    </DefaultLayout>
</template>