import dotenv from "dotenv";
dotenv.config();

import { PDFLoader } from "@langchain/community/document_loaders/fs/pdf";
import { RecursiveCharacterTextSplitter } from "@langchain/textsplitters";
import { vectorStore } from "./embedInput.js";

export async function indexDocument(filePath) {
  const loader = new PDFLoader(filePath, { splitPages: false }); // By default it breaks all pages into documents, each doc = each page
  const docs = await loader.load();

  // Split Content into Chunks
  const splitter = new RecursiveCharacterTextSplitter({ chunkSize: 500, chunkOverlap: 100 }); // Chunk Size - Max no. of Characters inside a chunk, chunkOverlap -> Previous chunks chars to store inside new chunk, so that a relation can be maintained

  const documents = await splitter.splitDocuments(docs);
  /** [  // Vector Store Accepts this Format of Document
   * Document {
   *    pageContent: '5. Remote Work Policy\n' +
   *   'Remote work is permitted based on role and manager approval. Employees must ensure a secure\n' +
   *   'internet connection and maintain productivity standards.\n' +
   *    '6. IT Usage Policy\n' +
   *    'Company-provided devices are for official use only. Installation of unauthorized software is\n' +
   *     'prohibited. All systems are subject to monitoring for security purposes.\n' +
   *    '7. Disciplinary Actions\n' +
   *    'Violation of company policies may result in warnings, suspension, or termination depending on',
   *  metadata: [Object],
   *  id: undefined
    },]
   */

  await vectorStore.addDocuments(documents); // embeddings stored in the vector database
}
