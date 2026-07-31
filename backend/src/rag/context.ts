import { Document } from "@langchain/core/documents";

export const formatDocuments = (
    docs: Document[]
) => {

    return docs
        .map(doc => doc.pageContent)
        .join("\n\n");

};