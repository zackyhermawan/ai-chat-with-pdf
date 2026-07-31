import { ChatOpenAI, OpenAIEmbeddings } from "@langchain/openai"

export const chatModel = new ChatOpenAI({
    apiKey: process.env.OPENAI_API_KEY,
    model: 'gpt-4.1-mini',
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL
    },
    maxTokens: 1000,
    temperature: 0
})

export const embeddings = new OpenAIEmbeddings({
    apiKey: process.env.OPENAI_API_KEY,
    model: 'text-embedding-3-small',
    configuration: {
        baseURL: process.env.OPENAI_BASE_URL
    }
})