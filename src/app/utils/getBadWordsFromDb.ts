import { prisma } from "@/app/utils/prismaClient";
export const getBadWordsFromDb = async () => {
  const badWordsFromDb = await prisma.badWordsList.findMany();
  let badWordsList = badWordsFromDb.map((word:any) => word.word);
  return badWordsList;
};
