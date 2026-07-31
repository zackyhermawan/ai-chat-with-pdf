import { getVectorStore } from "./vectorStore.js"

export const getRetriever = async(documentId: string, k = 5) => {
    const vectorStore = await getVectorStore()

    return vectorStore.asRetriever({
        k,
        filter: {
            documentId
        }
    })
}