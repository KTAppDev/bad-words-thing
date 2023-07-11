"use client";
import React, { Suspense, useState } from "react";
import { useAtom } from "jotai";
import { songAtom, songData, wordCountAtom } from "../store/store";
import { ISong } from "../utils/interfaces";
import Image from "next/image";
import Link from "next/link";
import searchYoutube from "../utils/getSongDuration";
import { percentageToTime } from "../utils/percentageToTime";
// import GetTimes from "@/app/components/GetTimes";
import { youtubeTimeStringToSeconds } from "../utils/youtubeTimeStringToSeconds";
interface singInfo {
  curseWords: {
    count: number;
    linesToEdit: string[];
  };
  timeFromPercentage: string[];
  error?: string;
}

interface IParam {
  percentageIntoSong: number;
  badWords: string;
}

const ResultsDashboard = async () => {
  const [songInfo, setSongInfo] = useAtom<singInfo>(songData);
  const [song_Atom, setSongAtom] = useAtom<ISong | null>(songAtom);
  const [wordCount_Atom, setWordCountAtom] = useAtom(wordCountAtom);
  // const [timeStamps, setTimeStamps] = useState<number[]>([]);
  // console.log(song_Atom);
  // let time = await searchYoutube(song_Atom?.title!);
  // let listOfPercentages = songInfo.curseWords.linesToEdit.map(
  //   (item: any) => item.percentageIntoSong
  // );
  // if (time !== undefined) {
  //   console.log("time has data", time);
  //   let songDurationInSeconds = youtubeTimeStringToSeconds(time);
  //   let result = percentageToTime(
  //     listOfPercentages,
  //     songDurationInSeconds,
  //     wordCount_Atom
  //   );
  //   setTimeStamps(result);
  // }
  // console.log("time stamps", timeStamps);
  if (songInfo.curseWords?.count === 0) {
    return <div>The song is clean or you did not provide lyrics</div>;
  }

  songInfo.curseWords.linesToEdit.shift();

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="container mx-auto p-4">
        <div
          id="main_card"
          className="flrx flex-col bg-white shadow-lg rounded-lg p-6"
        >
          <div className="flex flex-row flex-1 w-full justify-center gap-4">
            <div>
              <h2 className="text-2xl font-bold mb-4">{song_Atom?.title}</h2>
              <div>
                <h3 className="text-lg font-bold mb-2">Number of bad Words:</h3>
                <p>{songInfo.curseWords?.count}</p>
              </div>
              <div>
                <h3 className="text-lg font-bold mb-2">Word count:</h3>
                <p>{wordCount_Atom}</p>
              </div>
            </div>
            <div className="flex flex-col items-center justify-center">
              <Image
                src={song_Atom?.albumArt!}
                alt="album art"
                width={180}
                height={180}
              ></Image>
              <div>
                <Link
                  href={song_Atom?.url!}
                  rel="noopener noreferrer"
                  target="_blank"
                >
                  Lyrics
                </Link>
              </div>
            </div>
          </div>

          <div className="mb-4">
            <h3 className="text-lg font-bold mb-2">Bad words to edit:</h3>
            <ul>
              {songInfo.curseWords.linesToEdit.map((lyric: any, index) => (
                <li
                  key={index}
                  className="flex items-center mb-2 border border-gray-300 rounded px-2 py-1 gap-2"
                >
                  <Suspense fallback={<div>...</div>}>
                    <span>{songInfo.timeFromPercentage[index]}</span>
                  </Suspense>
                  <span>{lyric.badWords}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResultsDashboard;
