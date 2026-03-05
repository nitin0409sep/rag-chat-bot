import dotenv from "dotenv";
dotenv.config();

import { HuggingFaceInferenceEmbeddings } from "@langchain/community/embeddings/hf";
import { PineconeStore } from "@langchain/pinecone";
import { Pinecone as PineconeClient } from "@pinecone-database/pinecone";

const embeddings = new HuggingFaceInferenceEmbeddings({
  apiKey: process.env.HF_API_KEY,
  model: "sentence-transformers/all-MiniLM-L6-v2",
});

const pinecone = new PineconeClient({
  apiKey: process.env.PINE_CONE_API_KEY,
});

const pineconeIndex = pinecone.Index(process.env.PINE_CONE_INDEX_NAME);

export const vectorStore = await PineconeStore.fromExistingIndex(embeddings, {
  pineconeIndex,
  maxConcurrency: 5,
});
