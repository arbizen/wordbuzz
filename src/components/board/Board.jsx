import { motion } from "framer-motion";
import { useState, useRef, useEffect } from "react";
import {
  checkLineCircleIntersection,
  generateCirclesForWord,
} from "@/utils/boardUtils";
import Polyline from "@/components/board/shapes/Polyline";
import Circle from "@/components/board/shapes/Circle";
import { BoardContext } from "@/contexts/boardContext";
import RenderWord from "@/components/board/RenderWord";
import { supabaseClient } from "@/supabase/client";
import { Button } from "../ui/button";
import Link from "next/link";
import { ArrowLeft } from "lucide-react";
import { cn } from "@/lib/utils";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import {
  IMAGE_NOT_FOUND,
  LIFE_COUNT,
  MAX_TIME,
  MYCOLOR,
  OPPONENT_COLOR,
} from "./constants";
import { AnimatePresence } from "framer-motion";
import WaitingScreen, {
  SkeletonCircle,
  SkeletonRect,
} from "@/components/board/ui/WaitingScreen";
import Card from "./ui/Card";
import { Send } from "lucide-react";
export default function BoardView({ data }) {
  const [word, setWord] = useState("");
  const isMatching = useRef(false);
  const loggedUserId = data?.user?.id;
  const gameId = data?.gameId || "ghost1234";

  // states
  const [initialPosState, setInitialPosState] = useState(null);
  const [mousePositionState, setMousePositionState] = useState(null);
  const [matchedWordState, setMatchedWordState] = useState("");
  const [isMatchingState, setIsMatchingState] = useState(false);
  const [circlesState, setCirclesState] = useState([]);
  const [isReleased, setIsReleased] = useState(false);
  const [showBoard, setShowBoard] = useState(false);
  const [round, setRound] = useState(null); // 0 for opponent, 1 for me
  const [lifeCount, setLifeCount] = useState(LIFE_COUNT);
  const enableRealtime = useRef(true);
  const [visualPoints, setVisualPoints] = useState("");
  const [showInput, setShowInput] = useState(false);
  const [opponentLeft, setOpponentLeft] = useState(false);
  const [leftUserName, setLeftUserName] = useState("");
  const [duration, setDuration] = useState(MAX_TIME);
  const [isGameOver, setIsGameOver] = useState(false);
  const [opponentJoined, setOpponentJoined] = useState(false);
  const [wordInputValue, setWordInputValue] = useState("");
  const [hintOrReply, setHintOrReply] = useState("");
  const [placeholder, setPlaceholder] = useState("Send a word...");
  const [realtimeHint, setRealtimeHint] = useState("");
  const [opponent, setOpponent] = useState(null);
  const [hintSenderId, setHintSenderId] = useState(null);

  // refs
  const svgRef = useRef(null);
  const initialPos = useRef({ x: 0, y: 0 });
  const matchedWord = useRef("");
  const points = useRef("");
  const startCircle = useRef(null);
  const mousePosition = useRef({ x: 0, y: 0 });
  const canDraw = useRef(true);
  const room = useRef(null);
  const updatedInitialPos = useRef(null);
  const circles = useRef([]);
  const lifeCountRef = useRef(lifeCount);
  const opponentJoinedRef = useRef(opponentJoined);
  const lastWordSenderId = useRef(null);

  const handleMouseDown = (circle) => {
    if (!isMatching.current && canDraw.current && !(round === 0)) {
      setIsReleased(false);
      isMatching.current = true;
      setIsMatchingState(true);
      initialPos.current = circle.pos;
      startCircle.current = circle;
      setInitialPosState(circle.pos);
      points.current += `${circle.pos.x},${circle.pos.y} `;
      setVisualPoints(`${circle.pos.x},${circle.pos.y} `);
      matchedWord.current += circle.letter;
      setMatchedWordState(matchedWord.current);

      if (enableRealtime.current) {
        // send the points and the mouse event to the channel
        room.current.send({
          type: "broadcast",
          event: "onMouseDown",
          payload: {
            id: loggedUserId,
            startCircle: circle,
          },
        });
      }
    }
  };

  const handleMouseMove = (e) => {
    if (enableRealtime.current) {
      // if the room is not created, return
      if (!room.current) {
        return;
      }
    }

    if (!isMatching.current || !canDraw.current || round === 0) {
      return;
    }

    const event = e.touches ? e.touches[0] : e;
    const rect = svgRef.current.getBoundingClientRect();

    mousePosition.current = {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    };
    setMousePositionState({
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });

    for (let i = 0; i < circles.current.length; i++) {
      const circle = circles.current[i];
      // check if the mouse is not inside the start circle
      if (circle.id !== startCircle.current.id) {
        const intersected = checkLineCircleIntersection(
          initialPos.current.x,
          initialPos.current.y,
          mousePosition.current.x,
          mousePosition.current.y,
          circle.pos.x,
          circle.pos.y,
          circle.radius
        );
        const distance = Math.sqrt(
          Math.pow(circle.pos.x - mousePosition.current.x, 2) +
            Math.pow(circle.pos.y - mousePosition.current.y, 2)
        );

        if (intersected && distance < circle.radius) {
          if (!points.current.includes(`${circle.pos.x},${circle.pos.y}`)) {
            points.current += `${circle.pos.x},${circle.pos.y} `;
            setVisualPoints(
              (prev) => prev + `${circle.pos.x},${circle.pos.y} `
            );
            setInitialPosState(circle.pos);
            updatedInitialPos.current = circle.pos;
            matchedWord.current += circle.letter;
            setMatchedWordState(matchedWord.current);
            console.log(matchedWord.current);

            if (enableRealtime.current) {
              // send the points and the mouse event to the channel
              room.current.send({
                type: "broadcast",
                event: "draw",
                payload: {
                  id: loggedUserId,
                  circle,
                },
              });
            }
          }
        }
      }
    }
  };

  const handleMouseUp = () => {
    if (isMatching.current && canDraw.current && !(round === 0)) {
      setIsReleased(true);
      canDraw.current = false;
      setTimeout(() => {
        room.current.send({
          type: "broadcast",
          event: "correctWord",
          payload: {
            id: loggedUserId,
            matchedWord: matchedWord.current,
            word,
          },
        });

        isMatching.current = false;
        setIsMatchingState(false);
        setInitialPosState(null);
        setMousePositionState(null);
        points.current = "";
        matchedWord.current = "";
        setMatchedWordState("");
        canDraw.current = true;
      }, 1000);
      if (enableRealtime.current) {
        // send the points and the mouse event to the channel
        room.current.send({
          type: "broadcast",
          event: "onMouseUp",
          payload: {
            id: loggedUserId,
          },
        });
      }
    }
  };

  useEffect(() => {
    // if realtime is enabled
    if (enableRealtime.current) {
      // generate a random 6 character roomid
      //const roomId = Math.random().toString(36).substring(2, 8);
      //const roomId = "test";
      // create a new channel
      const boardRoom = supabaseClient.channel(`board:${gameId}`, {
        config: {
          broadcast: {
            self: true,
          },
          presence: {
            // send opponent info seperated by ~
            key: `${loggedUserId}~${
              data?.user?.user_metadata?.full_name ?? "No Name"
            }~${data?.user?.user_metadata?.picture ?? IMAGE_NOT_FOUND}`,
          },
        },
      });
      // assign the channel to the room ref
      room.current = boardRoom;
      // subscribe the user to the channel
      room.current.subscribe(async (status) => {
        if (status !== "SUBSCRIBED") {
          return null;
        }
        // track the presence of the user once subscribed to the channel
        await room.current.track({
          user: {
            id: loggedUserId,
            // name required to show once the user has left the game
            name:
              data?.user?.user_metadata?.full_name ||
              `Test User - ${loggedUserId}`,
          },
        });
      });

      room.current.on("broadcast", { event: "onMouseDown" }, ({ payload }) => {
        const id = payload?.id;
        const circleId = payload?.startCircle.id;
        const circle = circles.current.find((c) => c.id === circleId);
        if (id !== loggedUserId) {
          setIsReleased(false);
          isMatching.current = true;
          setIsMatchingState(true);
          initialPos.current = circle.pos;
          startCircle.current = circle;
          setInitialPosState(circle.pos);
          points.current += `${circle.pos.x},${circle.pos.y} `;
          setVisualPoints(`${circle.pos.x},${circle.pos.y} `);
          matchedWord.current += circle.letter;
          setMatchedWordState(matchedWord.current);
        }
      });

      room.current.on("broadcast", { event: "draw" }, ({ payload }) => {
        const id = payload?.id;
        const circleId = payload?.circle.id;
        const circle = circles.current.find((c) => c.id === circleId);
        if (id !== loggedUserId) {
          points.current += `${circle.pos.x},${circle.pos.y} `;
          setVisualPoints((prev) => prev + `${circle.pos.x},${circle.pos.y} `);
          setInitialPosState(circle.pos);
          updatedInitialPos.current = circle.pos;
          matchedWord.current += circle.letter;
          setMatchedWordState(matchedWord.current);
        }
      });

      // listen to the mouse up event
      room.current.on("broadcast", { event: "onMouseUp" }, ({ payload }) => {
        const id = payload?.id;
        if (id !== loggedUserId) {
          console.log("I am reaching here");

          setIsReleased(true);
          if (isMatching.current) {
            //canDraw.current = false;
            setTimeout(() => {
              isMatching.current = false;
              setIsMatchingState(false);
              setInitialPosState(null);
              setMousePositionState(null);
              updatedInitialPos.current = null;
              points.current = "";
              matchedWord.current = "";
              setMatchedWordState("");
              //canDraw.current = true;
            }, 1000);
          }
        }
      });

      // listen to the send word event
      room.current.on("broadcast", { event: "sendWord" }, ({ payload }) => {
        // set the game over state to false
        setIsGameOver(false);
        // extract the id from the payload
        const id = payload?.id;
        // shuffle the word
        const shuffled = payload?.shuffled;
        // main word entered by the user
        const mainWord = payload?.mainWord;
        // generate circles with circle positions
        const random = generateCirclesForWord(
          shuffled,
          20,
          window.innerWidth,
          window.innerHeight
        );
        // set the circles state
        circles.current = random;
        setCirclesState(circles.current);
        // set the main word
        setWord(mainWord);
        // show the board - (draw the circles and the word)
        setShowBoard(true);
        // set the life count
        setLifeCount(LIFE_COUNT);
        lifeCountRef.current = LIFE_COUNT;

        // set the round for the word receiver
        // round decides who's turn it is to draw the word not the word sender
        // word sender round is decided by the setShowInput state
        if (id === loggedUserId) {
          // word sender
          canDraw.current = false;
          setRound(0);
        } else {
          // word receiver
          canDraw.current = true;
          setRound(1);
        }
      });

      // listen to the correct word event
      room.current.on("broadcast", { event: "correctWord" }, ({ payload }) => {
        const id = payload?.id;
        const matchedWord = payload?.matchedWord;
        const w = payload?.word;
        if (matchedWord === w) {
          setShowBoard(false);
          if (id === loggedUserId) {
            // show the input to the player who just won to enter the next word
            setShowInput(true);
          }
        } else {
          // update life count for both players
          setLifeCount((prev) => prev - 1);
          lifeCountRef.current = lifeCountRef.current - 1;
          if (lifeCountRef.current === 0) {
            // TODO: show game over & the correct word
            setShowBoard(false);
            // set the game over state
            setIsGameOver(true);
            if (id === loggedUserId) {
              // show the input to the lost player to enter the next word
              setShowInput(true);
            }
          }
        }
      });

      // listen to the time over event
      room.current.on("broadcast", { event: "timeOver" }, ({ payload }) => {
        const id = payload?.id;
        // TODO: show game over & the correct word
        // hide the board
        setShowBoard(false);
        // set the game over state
        setIsGameOver(true);
        if (id === loggedUserId) {
          // show the input to the player who just lost to enter the next word
          setShowInput(true);
        }
      });

      // sync
      room.current
        .on("presence", { evnet: "sync" }, () => {
          const newState = room.current.presenceState();
          console.log("sync", newState);
        })
        .on("presence", { event: "join" }, ({ key }) => {
          const id = key.split("~")[0];
          const name = key.split("~")[1];
          const picture = key.split("~")[2];
          console.log("join", id, name, picture);
          // if the key doesn't match the logged user id then the opponent joined
          if (id !== loggedUserId && !opponentLeft) {
            // set the opponent joined state
            setOpponentJoined(true);
            // set the opponent left to false
            setOpponentLeft(false);
            // set the opponent joined ref to true
            opponentJoinedRef.current = true;
            // set the last word sender id to the opponent
            lastWordSenderId.current = loggedUserId;
            // set the opponent
            setOpponent({ id, name, picture });
          }
          // if the key matches the logged user id and the opponent joined ref is true then show the input to the later joined user to enter the first word
          console.log("lastWordSenderId", lastWordSenderId.current, id);
          if (
            opponentJoinedRef.current &&
            !opponentLeft &&
            id === lastWordSenderId.current
          ) {
            setShowInput(true);
          }
        })
        .on("presence", { event: "leave" }, ({ key, leftPresences }) => {
          const { user: leftUser } = leftPresences[0];
          const name = leftUser?.name;
          const id = leftUser?.id;
          // opponent left
          setOpponentLeft(true);
          // set the left user name
          setLeftUserName(name);
          // set show board to false
          setShowBoard(false);
          // set inital pos to null
          setInitialPosState(null);
          // set the mouse position to null
          setMousePositionState(null);
          // set show input to false
          setShowInput(false);

          if (word === "") {
            // user left without starting the game
            lastWordSenderId.current = id;
          } else {
            // if the input was visible to the player who stayed
            if (showInput) {
              // then set the last word sender id to the stayed player
              lastWordSenderId.current = loggedUserId;
            } else {
              // else set the last word sender id to the left player
              lastWordSenderId.current = id;
            }
          }
        });

      // listen to send hint
      room.current.on("broadcast", { event: "sendHint" }, ({ payload }) => {
        const id = payload?.id;
        const hint = payload?.hint;
        setRealtimeHint(hint);
        setHintSenderId(id);
        setTimeout(() => {
          setRealtimeHint("");
        }, 3500);
      });
    }
    return async () => {
      if (room.current) {
        await supabaseClient.removeChannel(room.current);
      }
    };
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!hintOrReply) {
      if (wordInputValue) {
        setShowInput(false);
        const word = wordInputValue.toUpperCase().trim();
        room.current.send({
          type: "broadcast",
          event: "sendWord",
          payload: {
            id: loggedUserId,
            shuffled: word
              .split("")
              .sort(() => Math.random() - 0.5)
              .join(""),
            mainWord: word,
          },
        });
        setWordInputValue("");
      } else {
        setPlaceholder("Please enter a word...");
      }
    } else {
      if (realtimeHint === "") {
        room.current.send({
          type: "broadcast",
          event: "sendHint",
          payload: {
            id: loggedUserId,
            hint: hintOrReply,
          },
        });
        setHintOrReply("");
      }
    }
  };

  if (!opponentJoined) {
    return <WaitingScreen data={data} />;
  }

  if (opponentLeft && leftUserName && !showBoard) {
    return (
      <div className="flex flex-col justify-center items-center h-screen gap-6">
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
        <p className={cn("text-slate-400 text-sm")}>
          <span className="text-blue-500 font-bold">{leftUserName}</span> left
          the game!
        </p>
        <Button variant="link" asChild>
          <Link className="flex gap-2 items-center" href={"/game"}>
            <ArrowLeft size={20} /> Go back to home
          </Link>
        </Button>
      </div>
    );
  }

  return (
    <BoardContext.Provider
      value={{
        setShowBoard,
        setLifeCount,
        canDraw,
      }}
    >
      <div className="h-screen w-screen overflow-hidden">
        <motion.svg
          className="absolute top-0 left-0"
          style={{
            height: `${window.innerHeight}px`,
            width: `${window.innerWidth}px`,
            backgroundColor: "#101619 ",
          }}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onTouchEnd={handleMouseUp}
          onTouchMove={handleMouseMove}
          ref={svgRef}
        >
          {/* {showBoard &&
            Array.from({ length: lifeCount }).map((_, index) => (
              <motion.circle
                key={index}
                cx={window.innerWidth - 100 - index * 25}
                cy={50}
                r={8}
                fill={round === 0 ? OPPONENT_COLOR : MYCOLOR}
              />
            ))} */}
          <RenderWord
            letters={word}
            word={word}
            isReleased={false}
            position="center"
            boxColor={OPPONENT_COLOR}
            isVisble={isGameOver}
          />
          {matchedWordState && (
            <RenderWord
              letters={matchedWordState}
              word={word}
              isReleased={isReleased}
              position="top"
              boxColor={OPPONENT_COLOR}
              isVisble={round === 0 /* opponent's take */}
            />
          )}
          {matchedWordState && (
            <RenderWord
              letters={matchedWordState}
              word={word}
              isReleased={isReleased}
              position="bottom"
              isVisble={round === 1 /* My take */}
              boxColor={MYCOLOR}
            />
          )}
          {isMatchingState && showBoard && initialPosState && (
            <Polyline
              points={visualPoints}
              strokeColor={round === 0 ? OPPONENT_COLOR : MYCOLOR}
            />
          )}
          {isMatchingState &&
            showBoard &&
            initialPosState &&
            mousePositionState && (
              <motion.g>
                <Polyline
                  points={`${initialPosState.x},${initialPosState.y} ${mousePositionState.x},${mousePositionState.y}`}
                  strokeColor={round === 0 ? OPPONENT_COLOR : MYCOLOR}
                />
              </motion.g>
            )}
          {showBoard &&
            circlesState.map((circle, index) => {
              return (
                <Circle
                  key={index}
                  cx={circle.pos.x}
                  cy={circle.pos.y}
                  r={circle.radius}
                  letter={circle.letter}
                  fill={round === 1 ? OPPONENT_COLOR : MYCOLOR}
                  onMouseDown={() => {
                    handleMouseDown(circle);
                  }}
                />
              );
            })}
        </motion.svg>
        {realtimeHint && (
          <AnimatePresence>
            <motion.div
              drag
              initial={{
                top: 0,
                y: hintSenderId === loggedUserId ? innerHeight : 0,
              }}
              animate={{
                y: hintSenderId === loggedUserId ? -100 : innerHeight + 100,
                transition: { duration: 3.5 },
              }}
              className="absolute w-screen top-0 left-0 z-50"
            >
              <div className="w-full flex justify-center">
                <p
                  className={cn(
                    "h-auto text-white rounded-full p-2 px-4 text-sm text-center",
                    hintSenderId === loggedUserId
                      ? "bg-blue-500"
                      : "bg-violet-500"
                  )}
                >
                  {realtimeHint}
                </p>
              </div>
            </motion.div>
          </AnimatePresence>
        )}
        <form onSubmit={handleSubmit}>
          {opponentJoined && (
            <AnimatePresence>
              <motion.div className="absolute w-screen top-0 md:flex md:justify-end md:pr-[50px] md:top-[50px]">
                <Card
                  className="border-b border-b-[#1D2539]"
                  actions={
                    <>
                      {showBoard && round === 0 ? (
                        <>
                          <div className="h-[35px] w-[35px] flex justify-center items-center text-green-500 gap-1">
                            <svg
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.5833 26.7604L12.4688 24.8354C4.95833 18.025 0 13.5188 0 8.02083C0 3.51458 3.52917 0 8.02083 0C10.5583 0 12.9937 1.18125 14.5833 3.03333C16.1729 1.18125 18.6083 0 21.1458 0C25.6375 0 29.1667 3.51458 29.1667 8.02083C29.1667 13.5188 24.2083 18.025 16.6979 24.8354L14.5833 26.7604Z"
                                fill="#EF4444"
                              />
                            </svg>
                            {lifeCount}
                          </div>
                        </>
                      ) : (
                        <SkeletonCircle />
                      )}
                      {showBoard && round === 0 ? (
                        <CountdownCircleTimer
                          size={30}
                          strokeWidth={2}
                          isPlaying
                          duration={duration}
                          colors={[round === 0 ? OPPONENT_COLOR : MYCOLOR]}
                          onComplete={() => {
                            // send time over event
                            // only send the event if the round is 1
                            if (round === 1) {
                              room.current.send({
                                type: "broadcast",
                                event: "timeOver",
                                payload: {
                                  id: loggedUserId,
                                },
                              });
                            }
                          }}
                        >
                          {({ remainingTime }) => (
                            <p className="text-[10px] text-slate-400">
                              {remainingTime}
                            </p>
                          )}
                        </CountdownCircleTimer>
                      ) : (
                        <SkeletonCircle />
                      )}
                    </>
                  }
                >
                  <SkeletonCircle
                    imageSrc={opponent?.picture ?? IMAGE_NOT_FOUND}
                  />
                  {!showBoard && (
                    <p className="text-sm w-full bg-transparent focus:outline-none text-slate-400 truncate">
                      {showInput ? (
                        <>
                          <span className="text-blue-500">
                            {opponent?.name.split(" ")[0]}
                          </span>{" "}
                          is waiting for a word...
                        </>
                      ) : (
                        <>
                          <span className="text-blue-500">
                            {opponent?.name.split(" ")[0]}
                          </span>{" "}
                          is sending a word...
                        </>
                      )}
                    </p>
                  )}
                  {showBoard && (
                    <p className="text-sm w-full bg-transparent focus:outline-none text-slate-400 truncate">
                      {round === 0 ? (
                        <>
                          <span className="text-blue-500">
                            {opponent?.name.split(" ")[0]}
                          </span>{" "}
                          is matching the word...
                        </>
                      ) : (
                        <>
                          <span className="text-blue-500">
                            {opponent?.name.split(" ")[0]}
                          </span>{" "}
                          sent a word.
                        </>
                      )}
                    </p>
                  )}
                </Card>
              </motion.div>
            </AnimatePresence>
          )}
        </form>
        <form onSubmit={handleSubmit}>
          {opponentJoined && (
            <AnimatePresence>
              <motion.div className="absolute bottom-0 md:bottom-[50px] md:left-[50px] w-full">
                <Card
                  className="border-t border-t-[#1D2539]"
                  actions={
                    <>
                      {showBoard && round === 1 && (
                        <>
                          <div className="h-[35px] w-[35px] flex justify-center items-center text-green-500 gap-1">
                            <svg
                              width="30"
                              height="30"
                              viewBox="0 0 30 30"
                              fill="none"
                              xmlns="http://www.w3.org/2000/svg"
                            >
                              <path
                                d="M14.5833 26.7604L12.4688 24.8354C4.95833 18.025 0 13.5188 0 8.02083C0 3.51458 3.52917 0 8.02083 0C10.5583 0 12.9937 1.18125 14.5833 3.03333C16.1729 1.18125 18.6083 0 21.1458 0C25.6375 0 29.1667 3.51458 29.1667 8.02083C29.1667 13.5188 24.2083 18.025 16.6979 24.8354L14.5833 26.7604Z"
                                fill="#EF4444"
                              />
                            </svg>
                            {lifeCount}
                          </div>
                        </>
                      )}
                      {showBoard && round === 1 && (
                        <CountdownCircleTimer
                          size={30}
                          strokeWidth={2}
                          isPlaying
                          duration={duration}
                          colors={[round === 0 ? OPPONENT_COLOR : MYCOLOR]}
                          onComplete={() => {
                            // send time over event
                            // only send the event if the round is 1
                            if (round === 1) {
                              room.current.send({
                                type: "broadcast",
                                event: "timeOver",
                                payload: {
                                  id: loggedUserId,
                                },
                              });
                            }
                          }}
                        >
                          {({ remainingTime }) => (
                            <p className="text-[10px] text-slate-400">
                              {remainingTime}
                            </p>
                          )}
                        </CountdownCircleTimer>
                      )}
                      <button
                        className={cn(
                          "h-[35px] w-[35px] rounded-md flex items-center justify-center p-2 bg-[#5E50FF]"
                        )}
                        onClick={handleSubmit}
                        type="submit"
                      >
                        <Send size={18} color="white" />
                      </button>
                    </>
                  }
                >
                  <SkeletonCircle
                    imageSrc={
                      data?.user?.user_metadata?.picture ?? IMAGE_NOT_FOUND
                    }
                  />
                  {showInput && (
                    <motion.input
                      onChange={(e) => setWordInputValue(e.target.value)}
                      value={wordInputValue}
                      placeholder={placeholder}
                      className="text-sm w-full bg-transparent text-white focus:outline-none placeholder-slate-400"
                    />
                  )}
                  {!showInput && opponentJoined && (
                    <motion.input
                      onChange={(e) => setHintOrReply(e.target.value)}
                      value={hintOrReply}
                      placeholder="Send a hint or reply..."
                      className="text-sm w-full bg-transparent text-white focus:outline-none placeholder-slate-400"
                    />
                  )}
                </Card>
              </motion.div>
            </AnimatePresence>
          )}
        </form>
        {showBoard && (
          <div className="absolute hidden right-[50px] top-[35px]">
            <CountdownCircleTimer
              size={30}
              strokeWidth={2}
              isPlaying
              duration={duration}
              colors={[round === 0 ? OPPONENT_COLOR : MYCOLOR]}
              onComplete={() => {
                // send time over event
                // only send the event if the round is 1
                if (round === 1) {
                  room.current.send({
                    type: "broadcast",
                    event: "timeOver",
                    payload: {
                      id: loggedUserId,
                    },
                  });
                }
              }}
            >
              {({ remainingTime }) => (
                <p className="text-[10px] text-slate-400">{remainingTime}</p>
              )}
            </CountdownCircleTimer>
          </div>
        )}
      </div>
    </BoardContext.Provider>
  );
}
