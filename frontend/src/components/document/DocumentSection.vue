<script setup lang="ts">
import { CircleCheckBig, CircleX, FilePlus2, FileText, LoaderCircle, Trash2 } from 'lucide-vue-next';
import { useDocumentStore } from '../../stores/document.store.ts';
import { onMounted, ref } from 'vue';

const documentStore = useDocumentStore()

const fileInput = ref<HTMLInputElement | null>(null)

onMounted(() => {
  documentStore.fetchDocument()
})

const active = (documentId: string | number) => documentStore.selectedDocument?.id === documentId

const canOpen = (document: { status: string }) => document.status === 'READY'

const openFilePicker = () => {
  fileInput.value?.click()
}

const handleUpload = async(e: Event) => {
  const input = e.target as HTMLInputElement

  const file = input.files?.[0]

  if(!file) return

  await documentStore.upload(file)

  input.value = ""
}

const deleteDocument = async(document: {id: string, title: string}) => {
  const confirmed = window.confirm(`Delete ${document.title}?`)

  if(!confirmed) return

  await documentStore.remove(document.id)
}
</script>

<template>
   <section class="flex h-full flex-col border-b border-slate-800">

    <input ref="fileInput" type="file" accept=".pdf" class="hidden" @change="handleUpload"/>

    <div class="flex items-center justify-between p-5">
      <h2 class="font-semibold">Documents</h2>

      <button @click="openFilePicker" :disabled="documentStore.isLoadingUpload" class="rounded-lg bg-indigo-500 p-2 transition hover:bg-indigo-400 disabled:cursor-not-allowed disabled:opacity-50">
        <FilePlus2 v-if="!documentStore.isLoading" class="h-4 w-4"/>

        <span v-else class="text-xs">
          ...
        </span>
      </button>

    </div>

    <div class="flex-1 space-y-3 overflow-y-auto px-5 pb-5">
      
      <div v-for="document in documentStore.documents" :key="document.id" @click="canOpen(document) && documentStore.selectDocument(document)" :class="['rounded-xl border p-3 transition-all duration-200 group', canOpen(document) ? 'cursor-pointer' : 'cursor-not-allowed opacity-70', active(document.id) ? 'border-indigo-500 bg-indigo-500/10' : 'border-slate-800 hover:border-indigo-500 hover:bg-slate-800']">

        <div class="flex items-center justify-between gap-3">

            <div class="flex flex-1 min-w-0 items-center gap-5">

                <FileText class="h-5 w-5 text-indigo-400 "/>
                
                <div class="min-w-0 flex-1">
                
                    <p class="truncate text-sm font-medium">
                      {{ document.title }}
                    </p>
                    
                    <p class="text-xs text-slate-500">
                      {{ new Date(document.createdAt).toLocaleDateString() }}
                    </p>
                    
                    <div class="mt-2">
                    
                        <div v-if="document.status === 'PROCESSING'" class="inline-flex items-center gap-1 rounded-full bg-yellow-500/10 px-2 py-1 text-xs text-yellow-400">
                            <LoaderCircle class="h-3 w-3 animate-spin"/>Processing</div>
                    
                        <div v-else-if="document.status === 'READY'" class="inline-flex items-center gap-1 rounded-full bg-green-500/10 px-2 py-1 text-xs text-green-400">
                            <CircleCheckBig class="h-3 w-3"/>Ready</div>
                    
                        <div v-else class="inline-flex items-center gap-1 rounded-full bg-red-500/10 px-2 py-1 text-xs text-red-400">
                            <CircleX class="h-3 w-3"/>Failed</div>
                    
                    </div>
                
                </div>
            </div>

            <button @click.stop="deleteDocument(document)" class="rounded p-1 text-slate-500 opacity-0 transition hover:bg-red-500/10 hover:text-red-400 group-hover:opacity-100">
                <Trash2 class="w-4 h-4"/>
            </button>

        </div>

      </div>

    </div>

  </section>
</template>