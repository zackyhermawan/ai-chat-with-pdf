import {Queue} from "bullmq"
import { redis } from "../lib/redis.js"


export const embeddingQueue = new Queue("embedding", {
    connection: redis
})