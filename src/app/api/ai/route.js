import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const genAi = new GoogleGenerativeAI(process.env.AI_API_KEY);
  const model = genAi.getGenerativeModel({
    model: "gemini-pro",
  });
  const prompt = `Suggest a random word from a given context and language. The response format should be just "word = random_word".
  language: russian
  context: happy
  random word:
  `;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  return NextResponse.json({
    data: text,
  });
}
