import dotenv from "dotenv";
dotenv.config();

import Groq from "groq-sdk";
import { getActiveResourcesInfo } from "node:process";
import readline from "node:readline/promises";
import { vectorStore } from "./embedInput.js";

const groq = new Groq({ apiKey: process.env.GROQ_API_KEY });

export async function getGroqChatCompletion(messages) {
  const rl = readline.createInterface({ input: process.stdin, output: process.stdout });

  while (true) {
    const question = await rl.question("You: ");

    if (question === "/bye") {
      break;
    }

    // retrieval
    const relevantChunks = await vectorStore.similaritySearch(question, 3);
    const context = relevantChunks.map((chunk) => chunk.pageContent).join("\n\n");

    const SystemPrompt = `You are an assistant for question and answering tasks. Use the following relevant chunks of retrieved context to answer the question. Don't reveal your identity or company info. . If you don't know the answer, say - Sorry, I don't have relevant information, please contact to customer care. `;

    const userPrompt = `
                        Question: ${question}
                        Relevant Context: ${context} 
                        Answer:  
                    `;

    const completion = await groq.chat.completions.create({
      model: "llama-3.3-70b-versatile",
      temperature: 0,
      max_completion_tokens: 200,
      messages: [
        {
          role: "system",
          content: SystemPrompt,
        },
        {
          role: "user",
          content: userPrompt,
        },
      ],
    });

    const result = completion.choices[0]?.message?.content || "";

    console.log(`Assistant: ${result}`);
  }

  rl.close();
}

getGroqChatCompletion();
