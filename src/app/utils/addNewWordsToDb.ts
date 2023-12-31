import { prisma } from "@/app/utils/prismaClient";

export async function addNewWordsToDb(words: string[]): Promise<{
  newWordsCount: number;
  skippedWordsCount: number;
}> {
  let newWordsCount = 0;
  let skippedWordsCount = 0;

  for (const word of words) {
    try {
      const existingWord = await prisma.badWordsList.findUnique({
        where: {
          word: word.trim(),
        },
      });

      if (existingWord) {
        skippedWordsCount++;
        continue; // Skip the current word and move to the next one
      }

      await prisma.badWordsList.create({
        data: {
          word: String(word).trim(),
        },
      });

      newWordsCount++;
    } catch (error) {
      console.error(`Error inserting word '${word}': ${error as string}`);
    }
  }

  return { newWordsCount, skippedWordsCount };
}
