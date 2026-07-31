export interface Document {
    id: string,
    filename: string
    title: string
    status: "PROCESSING" | "READY" | "FAILED",
    createdAt: string
    updatedAt: string
}