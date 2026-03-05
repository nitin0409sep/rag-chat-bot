/**
 * Stage 1 - Indexing
 * 1. Load the document (Unstructured Data) - pdf, text -> Completed
 * 2. Chunk the document -> Completed
 * 3. Generate vector embeddings
 * 4. Store the vector embeddings -> Vector DB
 *
 *
 * Stage 2 - Using the chatbot
 * 1. Setup LLM
 * 2. Add retrieval Step
 * 3. Pass input + relevant info to LLM
 */

import { indexDocument } from "./prepare.js";

const filePath = "./Dummy_Company_Policy_For_RAG_Practice.pdf";
indexDocument(filePath);
