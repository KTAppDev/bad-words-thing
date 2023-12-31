export default function identifierOccurrences(
  words: string[],
  identifier: string
) {
  // console.log(words.length);
  let linesToEdit: [{ badWords: string; percentageIntoSong: number }] = [
    { badWords: "", percentageIntoSong: 0 },
  ];
  let count = 0;
  for (let i = 0; i < words.length; i++) {
    if (words[i] === identifier) {
      count++;
      let percentageIntoSong = Math.round(((i + 1) / words.length) * 100); //plus one because the identifier is i the actual bad word is i+1

      let chopWordsOriginal = words.slice(i - 8, i + 4);
      let chopWords = chopWordsOriginal.filter((item) => item !== identifier);

      let joinedString = chopWordsOriginal.join(" ").replace("\r\n", " ");
      let badWordPackage = {
        badWords: joinedString,
        percentageIntoSong: percentageIntoSong,
      };
      linesToEdit.push(badWordPackage);
    }
  }
  if (count === 0) {
    return {
      count: count,
      linesToEdit: linesToEdit,
    };
  }

  return {
    count: count,
    linesToEdit: linesToEdit,
  };
}
