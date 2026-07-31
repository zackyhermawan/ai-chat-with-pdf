import { Worker } from "bullmq";
import { processDocument, updateDocument } from "../services/document.service.js";
import { redis } from "../lib/redis.js";

new Worker("embedding", async(job) => {
    const {documentId} = job.data

    try {
        await processDocument(documentId)

    } catch (error) {
        console.log(error)

        await updateDocument(documentId, "FAILED")

        throw error
    }
}, {
    connection: redis
})

console.log("Embedding worker running")