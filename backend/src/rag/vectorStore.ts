
import dotenv from "dotenv"

dotenv.config()

import { PoolConfig } from "pg"
import { DistanceStrategy, PGVectorStore } from "@langchain/community/vectorstores/pgvector"
import { embeddings } from "../lib/openai.js"

const config = {
    postgresConnectionOptions: {
        host: process.env.DB_HOST!,
        port: Number(process.env.DB_PORT!),
        user: process.env.DB_USER!,
        password: process.env.DB_PASSWORD!,
        database: process.env.DB_NAME
    } satisfies PoolConfig,
    

    tableName: "document_embeddings",

    columns: {
        idColumnName: "id",
        vectorColumnName: "embedding",
        contentColumnName: "content",
        metadataColumnName: "metadata"
    },

    distanceStrategy: "cosine" as DistanceStrategy,

    
}

export const getVectorStore = async() => {
    return await PGVectorStore.initialize(embeddings, config)
    
}