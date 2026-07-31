import { embeddingQueue } from "../queue/embedding.queue.js"

export const addEmbeddingJob = async(documentId: string) => {
    return embeddingQueue.add("embedding", {
        documentId
    })
}