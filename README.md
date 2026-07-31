# AI Chat With PDF

AI Chat With PDF adalah aplikasi berbasis **RAG (Retrieval Augmented Generation)** yang memungkinkan pengguna melakukan percakapan dengan dokumen PDF menggunakan bantuan Artificial Intelligence.

Pengguna dapat mengunggah dokumen PDF, kemudian sistem akan melakukan ekstraksi teks, memecah dokumen menjadi beberapa bagian (chunking), membuat embedding, menyimpan data vector, dan mengambil informasi yang relevan untuk menjawab pertanyaan berdasarkan isi dokumen.

Project ini dibuat dengan arsitektur fullstack yang sudah menggunakan **Docker Compose**, sehingga seluruh service dapat dijalankan hanya dengan satu perintah.


## Features

- Upload dokumen PDF
- Ekstraksi teks dari dokumen PDF
- Text chunking untuk membagi dokumen menjadi bagian kecil
- Generate embedding menggunakan AI model
- Penyimpanan vector menggunakan PostgreSQL + pgvector
- Vector similarity search untuk mencari informasi relevan
- Chat dengan dokumen PDF
- Riwayat conversation
- Background processing menggunakan worker queue
- Progress processing dokumen
- Fullstack application berbasis Docker


## Tech Stack

## Frontend

- Vue 3
- TypeScript
- Vite
- Tailwind CSS
- Pinia
- Axios


## Backend

- Node.js
- Express.js
- Prisma ORM
- REST API
- JWT Authentication


## AI & Processing

- Retrieval Augmented Generation (RAG)
- Text Embedding
- Vector Similarity Search
- Background Worker Processing


## Database & Infrastructure

- PostgreSQL
- pgvector
- Redis
- BullMQ
- Docker
- Docker Compose



# Running the Project


## Requirements

Pastikan sudah terinstall:

- Docker Desktop
- Docker Compose
- Git


## Clone Repository

```bash
git clone YOUR_REPOSITORY_URL

cd ai-chat-with-pdf

```


# Environment Setup

Sebelum menjalankan aplikasi, buat file environment berdasarkan contoh yang tersedia.

## Backend

Buat file:
backend/.env.docker

Sesuaikan konfigurasi:

```bash
DATABASE_URL=
REDIS_HOST=
REDIS_PORT=
OPENAI_API_KEY=
OPENAI_BASE_URL=
```

## Frontend

Buat file:
frontend/.env.docker

Isi:
```bash
VITE_API_URL=http://localhost:3000
```

Buat juga file:
frontend/.env.docker

Isi:
```bash
VITE_API_URL=http://backend:3000
```

## Menjalankan Aplikasi

Jalankan seluruh service menggunakan Docker Compose:
```bash
docker compose up --build
```

Service yang berjalan:
```bash
Frontend  → http://localhost

Backend   → http://localhost:3000

PostgreSQL → Port 5432

Redis → Port 6379
```

## Menghentikan Aplikasi

Untuk menghentikan seluruh container:

```bash
docker compose down
```

# Development Notes
Project ini menggunakan pendekatan containerized application sehingga frontend, backend, database, dan worker dapat dijalankan secara bersamaan menggunakan Docker Compose.

Cukup jalankan:
```bash
docker compose up
```

Untuk menjalankan seluruh sistem
