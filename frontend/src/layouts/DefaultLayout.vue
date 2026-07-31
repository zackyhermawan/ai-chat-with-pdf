<script setup lang="ts"></script>

<template>

    <div class="hidden lg:flex h-screen bg-slate-950 text-white">
        <slot />
    </div>

    <div class="flex lg:hidden h-screen items-center justify-center bg-slate-950 px-6">
        <div class="max-w-md text-center">
        <div class="mb-6 text-6xl">
            💻
        </div>

        <h1 class="text-2xl font-bold">
            Desktop Only
        </h1>

        <p class="mt-4 text-slate-400 leading-7">
            AI Chat with PDF is currently optimized for desktop and laptop devices.
            Please access this application using a screen width of at least
            <span class="font-semibold text-white">1024px</span>
            for the best experience.
        </p>

        <div class="mt-8 rounded-lg border border-slate-700 bg-slate-900 p-4">
            <p class="text-sm text-slate-300">
            Supported devices:
            </p>

            <ul class="mt-3 space-y-2 text-sm text-slate-400">
            <li>✅ Desktop Computer</li>
            <li>✅ Laptop</li>
            <li>❌ Tablet</li>
            <li>❌ Mobile Phone</li>
            </ul>
        </div>
        </div>
    </div>
</template>