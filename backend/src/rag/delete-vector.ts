import { prisma } from "../lib/prisma.js"

export const deleteDocumentVector = async(documentId: string) => {
    await prisma.$executeRawUnsafe(`DELETE FROM document_embeddings WHERE metadata->> 'documentId' = $1`, documentId)
}