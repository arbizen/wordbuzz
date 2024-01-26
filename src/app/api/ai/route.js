import { GoogleGenerativeAI } from "@google/generative-ai";
import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

export async function GET() {
  const genAi = new GoogleGenerativeAI(process.env.AI_API_KEY);
  const model = genAi.getGenerativeModel({
    model: "gemini-pro",
  });
  const prompt = `suggest random words for a word game separated by commas`;
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  const words = text.split(",").map((word) => word.trim().toUpperCase());
  return NextResponse.json({ words: words });
}
