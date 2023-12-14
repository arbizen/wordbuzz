"use client";

import { getUsername } from "@/utils/getUsername";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Board from "@/components/wordboard/Board";
import { generateCirclesForWord } from "@/utils/generateCircles";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {
  CIRLCE_BG_FOR_PLAYER_ONE,
  CIRLCE_BG_FOR_PLAYER_TWO,
} from "@/components/wordboard/constants";
import { useToast } from "@/components/ui/use-toast";
import { cn } from "@/lib/utils";
import Clipboard from "react-clipboard.js";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import Link from "next/link";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Separator } from "@/components/ui/separator";

const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

export const Layout = ({ children }) => {
  return (
    <div className="pb-12 md:pb-0 flex flex-col h-screen w-screen bg-[#101619] relative overflow-hidden">
      {children}{" "}
    </div>
  );
};

export const Info = ({ children, className }) => {
  return <p className={cn("text-slate-400 text-sm", className)}>{children} </p>;
};

export const WaitingScreen = () => {
  const { toast } = useToast();
  const handleCopy = () => {
    //navigator.clipboard.writeText(location.href);
    toast({
      title: "Copied to clipboard",
    });
  };
  return (
    <div className="flex flex-col justify-center items-center gap-6">
      <svg
        className="h-[250px] w-[250px] md:h-[300px] md:w-[300px]"
        viewBox="0 0 300 300"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <circle cx="150" cy="150" r="49.5" stroke="#1D2539" />
        <circle cx="150" cy="150" r="24.5" stroke="#1D2539" />
        <circle cx="149.5" cy="150.5" r="12" stroke="#1D2539" />
        <circle cx="150" cy="150" r="99.5" stroke="#1D2539" />
        <circle cx="150" cy="150" r="149.5" stroke="#1D2539" />
      </svg>
      <div className="flex gap-2 flex-wrap items-center justify-center max-w-[280px] md:max-w-full">
        <p className="px-2 py-1.5 flex items-center border border-[#1D2539] rounded-md text-slate-400 text-sm truncate overflow-x-scroll">
          {location.href}
        </p>
        <Button onClick={handleCopy} asChild>
          <Clipboard data-clipboard-text={location.href}>Copy link</Clipboard>
        </Button>
      </div>
    </div>
  );
};

export default function Initiator({ data }) {
  const gameId = data?.gameId;
  const initiatorUsername = data?.initiatorUsername;
  const loggedUser = data?.user;
  const loggedUsername = getUsername(loggedUser?.email);
  const [room, setRoom] = useState(null);
  const [players, setPlayers] = useState([]);
  const [player1, setPlayer1] = useState(null);
  const [player2, setPlayer2] = useState(null);
  const [currentRound, setCurrentRound] = useState(null);
  const [clientOnly, setClientOnly] = useState(false);
  const [isConnected, setIsConnected] = useState(false);

  const [isFirstWordSelected, setIsFirstWordSelected] = useState(null);
  const [word, setWord] = useState(null);
  const [isSelectedCorrect, setIsSelectedCorrect] = useState(null);
  const [circles, setCircles] = useState(null);
  const [selectedBy, setSelectedBy] = useState(null);

  const [drawnWord, setDrawnWord] = useState(null);
  const [isWordSelectionTimeOut, setIsWordSelectionTimeOut] = useState(false);
  const [isDrawingTime, setIsDrawingTime] = useState(false);
  const [randomWords, setRandomWords] = useState([]);
  const [isEnd, setIsEnd] = useState(false);
  const [endedBy, setEndedBy] = useState(null);
  const router = useRouter();
  const [ifExiting, setIfExiting] = useState(false);

  // write a function that takes an array of words and then return three random words from them
  const getRandomWords = (words) => {
    const randomWords = [];
    for (let i = 0; i < 3; i++) {
      const randomIndex = Math.floor(Math.random() * words.length);
      randomWords.push(words[randomIndex]);
    }
    return randomWords;
  };

  useEffect(() => {
    setClientOnly(true);
  }, []);

  useEffect(() => {
    const fetchRandomwords = async () => {
      // fetch random words from /api/words
      const res = await fetch("/api/words");
      const data = await res.json();
      const randomWords = data?.words;
      console.log(randomWords);
      setRandomWords(randomWords);
    };
    fetchRandomwords();
  }, [currentRound]);

  useEffect(() => {
    if (room) {
      room.on("broadcast", { event: "word-selected" }, ({ payload }) => {
        setWord(payload?.word);
        setCircles(payload?.circles);
        setIsFirstWordSelected(true);
        setSelectedBy(payload?.selectedBy);
        setIsDrawingTime(true);
        // if first word is selected, then set the current round to the other user
        const nextRound =
          payload?.selectedBy === payload?.players[0]?.username
            ? payload?.players[1]?.username
            : payload?.players[0]?.username;
        setCurrentRound(nextRound);
      });

      room.on("broadcast", { event: "game-ended" }, ({ payload }) => {
        setIsEnd(true);
        setEndedBy(payload?.user);
      });
    }
  }, [room]);

  useEffect(() => {
    const roomOne = client.channel(gameId, {
      config: {
        broadcast: { self: true },
      },
    });
    setRoom(roomOne);
    roomOne
      .on("broadcast", { event: "second-user-connected" }, ({ payload }) => {
        setPlayers(payload?.players);
        setIsConnected(true);
        const p1 = payload?.players[0];
        const p2 = payload?.players[1];
        const player1ptions = {
          indicatorColor: "blue",
          circleBg: "violet",
        };
        const player2ptions = { indicatorColor: "violet", circleBg: "blue" };
        if (p1?.username === loggedUsername) {
          setPlayer1({ ...p1, ...player1ptions });
          setPlayer2({ ...p2, ...player2ptions });
        } else {
          setPlayer1({ ...p2, ...player1ptions });
          setPlayer2({ ...p1, ...player2ptions });
        }
        // set current round
        setCurrentRound(payload?.currentRound);
        setIsFirstWordSelected(false);
      })
      .subscribe(async (status) => {
        if (status !== "SUBSCRIBED") {
          return null;
        }
        if (loggedUsername !== initiatorUsername) {
          // second user connected
          const { data, error } = await client
            .from("board")
            .select("*")
            .eq("gameId", gameId);
          const player1 = data[0]?.player1;
          const player2 = data[0]?.player2;
          const randomCurrentRoundUsername =
            Math.random() > 0.5 ? player1?.username : player2?.username;
          roomOne.send({
            type: "broadcast",
            event: "second-user-connected",
            payload: {
              players: [player1, player2],
              currentRound: randomCurrentRoundUsername,
            },
          });
        }
      });
    return () => {
      client.removeChannel(roomOne);
    };
  }, []);

  const handleWordSelection = (word) => {
    room.send({
      type: "broadcast",
      event: "word-selected",
      payload: {
        word,
        selectedBy: loggedUsername,
        players,
        circles: generateCirclesForWord(word, 20),
      },
    });
  };

  const handleExitGame = () => {
    setIfExiting(true);
    if (room) {
      room.send({
        type: "broadcast",
        event: "game-ended",
        payload: {
          user: loggedUsername,
        },
      });
    }
    router.push("/game");
  };

  if (isEnd && loggedUsername !== endedBy) {
    return (
      <Layout>
        <div className="flex flex-col justify-center items-center h-full gap-6">
          <svg
            className="h-[250px] w-[250px] md:h-[300px] md:w-[300px]"
            viewBox="0 0 300 300"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <circle cx="150" cy="150" r="49.5" stroke="#1D2539" />
            <circle cx="150" cy="150" r="24.5" stroke="#1D2539" />
            <circle cx="150" cy="150" r="99.5" stroke="#1D2539" />
            <circle cx="150" cy="150" r="149.5" stroke="#1D2539" />
            <path
              d="M145.58 154.419L154.42 145.581M145.58 145.581L154.42 154.419"
              stroke="#1D2539"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </svg>
          <Info>
            <span className="text-blue-500 font-bold">{endedBy}</span> left the
            game!
          </Info>
          <Button variant="link" asChild>
            <Link className="flex gap-2 items-center" href={"/game"}>
              <ArrowLeft size={20} /> Go back to home
            </Link>
          </Button>
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <header className="py-6 px-4 border-b border-b-[#1D2539] flex justify-between items-center md:min-h-[80px]">
        {!isConnected && (
          <div className="w-full text-center">
            <Info>
              {initiatorUsername === loggedUsername
                ? "Waiting for the other player to connect..."
                : "Connecting..."}
            </Info>
          </div>
        )}
        {player1 && player2 && (
          <>
            <div className="flex gap-4 items-center font-bold text-sm text-violet-500">
              <Image
                className="rounded-full"
                alt="player2"
                src={
                  player2?.user?.user_metadata?.picture ??
                  "https://gravatar.com/avatar/a58aa744b49b737a8f3b36009005b5aa?s=200&d=robohash&r=x"
                }
                height={40}
                width={40}
              />
              <h3>{player2?.user?.user_metadata?.full_name}</h3>
            </div>
            {!isDrawingTime && (
              <>
                {currentRound !== player2?.username ? (
                  <Info>Awaiting word...</Info>
                ) : (
                  <Info>Sending a word...</Info>
                )}
              </>
            )}
            {isDrawingTime && currentRound === player2?.username && (
              <CountdownCircleTimer
                size={35}
                strokeWidth={2}
                isPlaying
                duration={60}
                colors={["#8B5CF6"]}
                onComplete={() => {
                  setIsDrawingTime(false);
                  setIsWordSelectionTimeOut(false);
                }}
              >
                {({ remainingTime }) => (
                  <p className="text-sm text-slate-400">{remainingTime}</p>
                )}
              </CountdownCircleTimer>
            )}
          </>
        )}
      </header>
      <main className="flex-1 flex justify-center items-center">
        {!isConnected && initiatorUsername === loggedUsername && (
          <WaitingScreen />
        )}
        {isConnected &&
          !isFirstWordSelected &&
          currentRound === loggedUsername &&
          !isWordSelectionTimeOut && (
            <Info>Click one of the words to send.</Info>
          )}
        <div className="flex flex-col items-center justify-center">
          <div className="flex gap-2">
            {drawnWord &&
              loggedUsername !== currentRound &&
              [...drawnWord].map((w, i) => (
                <div
                  key={i}
                  className={`py-2 px-3 rounded-md bg-violet-500 text-white`}
                >
                  {w}
                </div>
              ))}
          </div>
          {clientOnly &&
            isFirstWordSelected &&
            word &&
            circles &&
            selectedBy &&
            isDrawingTime && (
              <Board
                mainWord={word}
                circles={circles}
                indicatorStrokeColor={
                  currentRound === loggedUsername
                    ? CIRLCE_BG_FOR_PLAYER_ONE
                    : CIRLCE_BG_FOR_PLAYER_TWO
                }
                getSelectedWord={(w) => setDrawnWord(w)}
                circleBg={
                  selectedBy === loggedUsername
                    ? CIRLCE_BG_FOR_PLAYER_ONE
                    : CIRLCE_BG_FOR_PLAYER_TWO
                }
                selectedBy={selectedBy}
                canDraw={currentRound === loggedUsername}
                loggedUsername={loggedUsername}
                players={[player1, player2]}
                onSelected={(payload) => {
                  const isCorrect = payload.isCorrect;
                  console.log(payload);
                  setIsSelectedCorrect(payload.isCorrect);
                  if (isCorrect) {
                    setTimeout(() => {
                      setIsDrawingTime(false);
                      setIsWordSelectionTimeOut(false);
                      setIsSelectedCorrect(null);
                    }, 1000);
                  }
                }}
                room={room}
                enableRealTime={true}
              />
            )}
          <div className="flex gap-2">
            {drawnWord &&
              loggedUsername === currentRound &&
              [...drawnWord].map((w, i) => (
                <div
                  key={i}
                  className={`py-2 px-3 rounded-md bg-blue-500 text-white`}
                >
                  {w}
                </div>
              ))}
          </div>
        </div>
      </main>
      <footer className="py-6 px-4 border-t border-t-[#1D2539] flex justify-between items-center text-white">
        <div className="flex gap-4 items-center font-bold text-sm text-blue-500">
          <Popover>
            <PopoverTrigger asChild>
              <Image
                className="rounded-full"
                alt="player1"
                src={
                  loggedUser?.user_metadata?.picture ??
                  "https://gravatar.com/avatar/a58aa744b49b737a8f3b36009005b5aa?s=400&d=wavatar&r=x"
                }
                height={40}
                width={40}
              />
            </PopoverTrigger>
            <PopoverContent className="md:hidden bg-[#101619] border-[#1D2539]">
              <h3 className="block text-blue-500 w-full text-center mb-2">
                {loggedUser?.user_metadata?.full_name ?? "No name panda"}
              </h3>
              <Separator className="w-full bg-[#1D2539] mb-4" />
              <Button
                onClick={handleExitGame}
                className="text-sm w-full"
                variant="destructive"
              >
                {ifExiting ? "Leaving..." : "Leave game"}
              </Button>
            </PopoverContent>
          </Popover>

          <h3 className="hidden md:block">
            {loggedUser?.user_metadata?.full_name ?? "No name panda"}
          </h3>
        </div>
        {!isConnected && initiatorUsername === loggedUsername && (
          <Info className="hidden md:block">
            Copy the link and invite a friend.
          </Info>
        )}
        {isDrawingTime && currentRound !== loggedUsername && (
          <Info>
            You have sent the word <span className="text-blue-500">{word}</span>
          </Info>
        )}
        {isConnected &&
          currentRound === loggedUsername &&
          !isWordSelectionTimeOut &&
          !isDrawingTime && (
            <div className="flex gap-2">
              {randomWords.map((word, i) => (
                <Button
                  key={i}
                  onClick={() => {
                    handleWordSelection(word);
                  }}
                  size="sm"
                  variant="outline"
                  className="border-blue-500 text-blue-500 hover:bg-blue-400"
                >
                  {word}
                </Button>
              ))}
            </div>
          )}
        <div>
          <div className="flex gap-4 items-center">
            {isDrawingTime && currentRound === loggedUsername && (
              <CountdownCircleTimer
                size={35}
                strokeWidth={2}
                isPlaying
                duration={60}
                colors={["#3B82F6"]}
                onComplete={() => {
                  setIsDrawingTime(false);
                  setIsWordSelectionTimeOut(false);
                }}
              >
                {({ remainingTime }) => (
                  <p className="text-sm text-slate-400">{remainingTime}</p>
                )}
              </CountdownCircleTimer>
            )}
            {isConnected &&
              currentRound === loggedUsername &&
              !isWordSelectionTimeOut &&
              !isDrawingTime && (
                <CountdownCircleTimer
                  size={35}
                  strokeWidth={2}
                  isPlaying
                  duration={15}
                  colors={["#3B82F6"]}
                  onComplete={() => {
                    setIsWordSelectionTimeOut(true);
                    handleWordSelection(
                      randomWords[Math.floor(Math.random() * 3)]
                    );
                    return {
                      shouldRepeat: false,
                    };
                  }}
                >
                  {({ remainingTime }) => (
                    <p className="text-sm text-slate-400">{remainingTime}</p>
                  )}
                </CountdownCircleTimer>
              )}
            <Button
              onClick={handleExitGame}
              className="text-sm hidden md:block"
              variant="destructive"
            >
              {ifExiting ? "Leaving..." : "Leave game"}
            </Button>
          </div>
        </div>
      </footer>
    </Layout>
  );
}
