import express from "express"
import cors from "cors"

// TEST
import aiTestRoute from "./routes/test/ai.test.js"
import pdfTestRoute from "./routes/test/pdf.test.js"
import splitTestRoute from "./routes/test/split.test.js"
import embedTestRoute from "./routes/test/embedding.test.js"
import vectorTestRoute from "./routes/test/vector.test.js"
import retrieverTestRoute from "./routes/test/retriever.test.js"

// ROUTE
import documentRoute from "./routes/document.route.js"
import conversationRoute from "./routes/conversation.route.js"
import messageRoute from "./routes/message.route.js"
import chatRoute from "./routes/chat.route.js"
import authRoute from "./routes/auth.route.js"

const app = express()

app.use(cors())
app.use(express.json())

// TEST
app.use("/ai", aiTestRoute)
app.use("/pdf", pdfTestRoute)
app.use("/split", splitTestRoute)
app.use("/embedding", embedTestRoute)
app.use("/vector", vectorTestRoute)
app.use("/retriever", retrieverTestRoute)

// ROUTE
app.use("/documents", documentRoute)
app.use("/conversations", conversationRoute)
app.use("/messages", messageRoute)
app.use("/chats", chatRoute)
app.use("/auth", authRoute)

export default app