import { NextResponse } from "next/server";
import { promises as fs } from "fs";

export const dynamic = "force-dynamic"; // defaults to auto

const getRandomElements = (array, count) => {
  const shuffled = array.sort(() => 0.5 - Math.random());
  return shuffled.slice(0, count);
};

export async function GET(request) {
  const data = await fs.readFile(process.cwd() + "/public/words.txt", "utf8");
  const words = data
    .split("\n")
    .map((line) => line.trim()) // Trim whitespace
    .filter((line) => line && !line.startsWith("#")); // Exclude empty lines and lines starting with "#"

  // Filter words with length between 3 and 6
  const filteredWords = words.filter(
    (word) => /^[a-zA-Z]+$/.test(word) && word.length >= 3 && word.length <= 8
  );

  // Get three random words from the filteredWords array
  const randomWords = getRandomElements(filteredWords, 3);
  const uppercaseWords = randomWords.map((word) => word.toUpperCase());
  return NextResponse.json({ words: uppercaseWords });
}
