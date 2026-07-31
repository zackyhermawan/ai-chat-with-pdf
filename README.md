# AI Chat With PDF

AI Chat With PDF is a RAG-based application that allows users to upload PDF documents and interact with them through AI-powered conversations.

The system extracts document content, creates embeddings, stores vector data, and retrieves relevant information to answer user questions based on the uploaded documents.


## Features

- Upload PDF documents
- Extract text from PDF files
- Text chunking
- Generate document embeddings
- Vector similarity search using pgvector
- Chat with PDF documents
- Conversation history
- Background embedding processing using worker queue
- Dockerized fullstack application


## Tech Stack

### Frontend

- Vue 3
- TypeScript
- Vite
- Tailwind CSS
- Pinia
- Axios


### Backend

- Node.js
- Express.js
- Prisma ORM
- REST API


### Database & Infrastructure

- PostgreSQL
- pgvector
- Redis
- BullMQ
- Docker
- Docker Compose


## Architecture
