# Company Chat Bot

### AI-Powered Company Policy Q&A System

A RAG (Retrieval-Augmented Generation) based chatbot that answers employee questions using company policy documents. It loads PDFs, splits them into semantic chunks, generates vector embeddings via HuggingFace, stores them in Pinecone, and uses Groq's Llama 3.3 70B model to deliver context-aware answers through an interactive CLI.

## Tech Stack

- **Node.js** - Runtime environment (ES Modules)
- **LangChain** - Document loading, text splitting, and vector store integration
- **Pinecone** - Vector database for storing and retrieving embeddings
- **HuggingFace** - Embedding model (`sentence-transformers/all-MiniLM-L6-v2`)
- **Groq** - LLM inference engine (`Llama 3.3 70B Versatile`)
- **pdf-parse** - PDF document parsing

## How It Works

### Stage 1 — Indexing

1. Load unstructured data (PDF documents)
2. Split content into chunks (500 chars with 100 char overlap)
3. Generate vector embeddings using HuggingFace
4. Store embeddings in Pinecone vector database

### Stage 2 — Chat

1. User asks a question via the CLI
2. Relevant chunks are retrieved from Pinecone using similarity search
3. Retrieved context + user question are passed to Groq's Llama 3.3 model
4. The model generates a grounded, context-aware response

## Getting Started

### Prerequisites

- Node.js installed
- API keys for HuggingFace, Pinecone, and Groq

### Installation

```bash
git clone <repo-url>
cd company-chat-bot
npm install
```

### Environment Variables

Create a `.env` file in the root directory:

```env
HF_API_KEY=your_huggingface_api_key
PINE_CONE_API_KEY=your_pinecone_api_key
PINE_CONE_INDEX_NAME=your_pinecone_index_name
GROQ_API_KEY=your_groq_api_key
```

### Usage

**Index a document:**

```bash
node index.js
```

**Start the chatbot:**

```bash
node chat.js
```

Type your questions and get answers based on the company policy document. Type `/bye` to exit.
