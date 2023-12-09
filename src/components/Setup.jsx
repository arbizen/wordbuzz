"use client";

import { useState } from "react";
import Board from "./wordboard/Board";

export default function Setup({ word, circles }) {
  const [selectedWord, setSelectedWord] = useState("");
  const [isCorrect, setIsCorrect] = useState(null);
  return (
    <div className="w-full bg-slate-100 flex justify-center flex-col items-center">
      <p
        className={
          isCorrect === true
            ? "text-green-500"
            : isCorrect === false
            ? "text-red-500"
            : "text-black"
        }
      >
        {selectedWord}
      </p>
      <Board
        mainWord={word}
        circles={circles}
        getSelectedWord={(w) => setSelectedWord(w)}
        onSelected={(payload) => {
          setIsCorrect(payload.isCorrect);
          console.log(payload);
        }}
        onReset={() => {
          setIsCorrect(null);
        }}
      />
    </div>
  );
}
