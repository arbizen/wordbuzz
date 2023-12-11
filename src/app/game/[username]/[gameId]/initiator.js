"use client";

import { getUsername } from "@/utils/getUsername";
import { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";
import Board from "@/components/wordboard/Board";
import { generateCirclesForWord } from "@/utils/generateCircles";

const client = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
);

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

  const [isFirstWordSelected, setIsFirstWordSelected] = useState(null);
  const [word, setWord] = useState(null);
  const [circles, setCircles] = useState(null);
  const [selectedBy, setSelectedBy] = useState(null);

  const [drawnWord, setDrawnWord] = useState(null);

  useEffect(() => {
    setClientOnly(true);
  }, []);

  useEffect(() => {
    if (room) {
      room.on("broadcast", { event: "word-selected" }, ({ payload }) => {
        setWord(payload?.word);
        setCircles(payload?.circles);
        setIsFirstWordSelected(true);
        setSelectedBy(payload?.selectedBy);
        // if first word is selected, then set the current round to the other user
        const nextRound =
          payload?.selectedBy === payload?.players[0]?.username
            ? payload?.players[1]?.username
            : payload?.players[0]?.username;
        setCurrentRound(nextRound);
        console.log(nextRound);
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
        console.log(payload?.players);
        setPlayers(payload?.players);
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

  return (
    <div className="h-screen w-screen">
      <p>current round: {currentRound}</p>
      {player1 && player2 && (
        <p>
          User 1:{player1?.username} - User 2:{player2?.username}
        </p>
      )}
      {currentRound && currentRound === loggedUsername && (
        <button
          onClick={() => {
            handleWordSelection("AMAZING");
          }}
        >
          AMAZING
        </button>
      )}
      {currentRound !== loggedUsername && drawnWord && <p>{drawnWord}</p>}
      {clientOnly && isFirstWordSelected && word && circles && selectedBy && (
        <Board
          mainWord={word}
          circles={circles}
          indicatorStrokeColor={
            currentRound === loggedUsername ? "blue" : "violet"
          }
          getSelectedWord={(w) => setDrawnWord(w)}
          circleBg={selectedBy === loggedUsername ? "blue" : "violet"}
          canDraw={currentRound === loggedUsername}
          loggedUsername={loggedUsername}
          players={[player1, player2]}
          onSelected={(payload) => {
            console.log(payload);
          }}
          room={room}
          enableRealTime={true}
        />
      )}
      {currentRound === loggedUsername && drawnWord && <p>{drawnWord}</p>}
    </div>
  );
}
