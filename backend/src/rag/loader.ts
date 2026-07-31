import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf"

export const loadPDF = async(filepath: string) => {
    const loader = new PDFLoader(filepath)

    return await loader.load()
}