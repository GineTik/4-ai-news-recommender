"use server";

import OpenAI from "openai";
import dotenv from "dotenv";

dotenv.config();

const openai = new OpenAI({
  baseURL: "https://openrouter.ai/api/v1",
  apiKey: process.env.OPEN_ROUTER_API_KEY ?? "",
});

const MODEL = "mistralai/mistral-7b-instruct:free";

export const writeToAIModel = async (rulesPrompt: string, prompt: string) => {
  const completion = await openai.chat.completions.create({
    model: MODEL,
    messages: [
      {
        role: "system",
        content: rulesPrompt,
      },
      { role: "user", content: prompt },
    ],
  });
  return completion;
};
