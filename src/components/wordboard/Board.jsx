"use client";
import { checkCollision } from "@/utils/checkCollision";
import { useEffect, useRef, useState } from "react";
import { duplicateArrayExceptFirstAndLast } from "@/utils/duplicate";
import LineDrawer from "./LineDrawer";
import CircleDrawer from "./CircleDrawer";
import {
  RESET_DELAY,
  INDICATOR_STROKE_COLOR,
  LETTER_FONT_SIZE,
  CIRCLE_BG,
  CANVAS_DIMENTION,
} from "./constants";

export default function Board({
  mainWord = "",
  circles = [],
  getSelectedWord,
  onSelected,
  onReset,
  indicatorStrokeColor = INDICATOR_STROKE_COLOR,
  circleBg = CIRCLE_BG,
  canDraw = true,
  enableRealTime = false,
  room = null,
  loggedUsername,
  players,
  selectedBy,
}) {
  const [isDrawing, setIsDrawing] = useState(false);

  // constants

  // container
  const container = useRef(null);

  // circle
  const [touchedCircles, setTouchedCircles] = useState([]);
  const [startCircle, setStartCirlce] = useState(null);
  const [reducedCircleIds, setReducedCircleIds] = useState([]);
  const [word, setWord] = useState("");
  const [correctWord, _] = useState(mainWord);
  const [circleBgColor, setCircleBgColor] = useState(circleBg);

  // lines
  const [lines, setLines] = useState([]);

  // indicator
  const [startPos, setStartPos] = useState(null);
  const [endPos, setEndPos] = useState(null);
  const [currentDrawingUsername, setCurrentDrawingUsername] = useState(null);

  // effects
  useEffect(() => {
    if (getSelectedWord) {
      // pass the word to the parent
      getSelectedWord(word);
    }
  }, [word]);

  useEffect(() => {
    setCircleBgColor(circleBg);
  }, [circleBg]);

  useEffect(() => {
    if (room) {
      // listen to mouse up event
      room.on("broadcast", { event: "onMouseDown" }, ({ data }) => {
        const { circle, players } = data;
        const player2 = players[1];
        if (player2?.username === loggedUsername) {
          setIsDrawing(true);
          setStartCirlce(circle);
          setStartPos(circle.pos);
          setTouchedCircles([circle.id]);
          setWord([circle.letter]);
        }
      });

      // listen to mouse up event
      room.on("broadcast", { event: "onMouseUp" }, ({ data }) => {
        const { word, correctWord, players, selectedBy } = data;
        const player2 = players[1];
        if (player2?.username === loggedUsername) {
          setStartPos(null);
          setEndPos(null);
          setIsDrawing(false);
          if (word.length > 0) {
            if (word === correctWord) {
              setCircleBgColor("green");
              onSelected && onSelected({ word, isCorrect: true });
            } else {
              setCircleBgColor("red");
              onSelected && onSelected({ word, isCorrect: false });
            }
          }
          setTimeout(() => {
            setLines([]);
            setTouchedCircles([]);
            setReducedCircleIds([]);
            setStartCirlce(null);
            setWord([]);
            setCircleBgColor(selectedBy === loggedUsername ? "blue" : "violet");
            onReset && onReset();
          }, RESET_DELAY);
        }
      });

      room.on("broadcast", { event: "onMouseMove" }, ({ data }) => {
        const {
          pos,
          circles,
          startCircle,
          reducedCircleIds,
          touchedCircles,
          players,
        } = data;
        const player2 = players[1];
        if (player2?.username === loggedUsername) {
          setEndPos(pos);
          circles.forEach((circle) => {
            if (
              circle.id !== startCircle.id &&
              !reducedCircleIds.includes(circle.id)
            ) {
              const collided = checkCollision(circle, pos);
              if (collided) {
                setTouchedCircles([...touchedCircles, circle.id]);
                const reduced = Array.from(new Set(touchedCircles));
                const letters = reduced.map((id) => {
                  const c = circles.find((cir) => cir.id === id);
                  return c.letter;
                });
                setWord(letters.join(""));
                setReducedCircleIds(reduced);
                const duplicated = duplicateArrayExceptFirstAndLast(reduced);
                const updatedLines = duplicated.map((id, i) => {
                  const c = circles.find((cir) => cir.id === id);
                  if (i % 2 === 0) {
                    return { startPos: c.pos };
                  } else {
                    return { endPos: c.pos };
                  }
                });
                const transformedLines = transformArray(updatedLines);
                setLines(transformedLines);
                setStartPos(circle.pos);
              }
            }
          });
        }
      });
    }
  }, [room]);

  const handleMouseDown = (circle) => {
    if (enableRealTime && canDraw) {
      if (room) {
        room.send({
          type: "broadcast",
          event: "onMouseDown",
          data: {
            circle,
            players,
          },
        });
      }
    }

    if (canDraw) {
      setIsDrawing(true);
      setStartCirlce(circle);
      setStartPos(circle.pos);
      setTouchedCircles([circle.id]);
      setWord([circle.letter]);
    }
  };

  function transformArray(inputArray) {
    const transformedArray = [];

    for (let i = 0; i < inputArray.length; i += 2) {
      if (i + 1 < inputArray.length) {
        transformedArray.push({
          startPos: inputArray[i].startPos,
          endPos: inputArray[i + 1].endPos,
        });
      }
    }

    return transformedArray;
  }

  const handleMouseMove = (e) => {
    //console.log(e);
    if (!isDrawing || !startCircle || !canDraw) {
      return;
    }
    // Use either mouse or touch event depending on the platform
    const event = e.touches ? e.touches[0] : e;

    // Get the position of the pointer relative to the div
    const rect = container.current.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;
    const pos = { x, y };

    // if realtime is enable then send handle mouse move event
    if (enableRealTime && room) {
      room.send({
        type: "broadcast",
        event: "onMouseMove",
        data: {
          pos,
          circles,
          startCircle,
          reducedCircleIds,
          touchedCircles,
          players,
        },
      });
    }

    setEndPos(pos);

    circles.forEach((circle) => {
      if (
        circle.id !== startCircle.id &&
        !reducedCircleIds.includes(circle.id)
      ) {
        const collided = checkCollision(circle, pos);
        if (collided) {
          setTouchedCircles([...touchedCircles, circle.id]);
          const reduced = Array.from(new Set(touchedCircles));
          const letters = reduced.map((id) => {
            const c = circles.find((cir) => cir.id === id);
            return c.letter;
          });
          setWord(letters.join(""));
          setReducedCircleIds(reduced);
          const duplicated = duplicateArrayExceptFirstAndLast(reduced);
          const updatedLines = duplicated.map((id, i) => {
            const c = circles.find((cir) => cir.id === id);
            if (i % 2 === 0) {
              return { startPos: c.pos };
            } else {
              return { endPos: c.pos };
            }
          });
          const transformedLines = transformArray(updatedLines);
          setLines(transformedLines);
          setStartPos(circle.pos);
        }
      }
    });
  };

  const handleMouseUp = () => {
    if (enableRealTime && room && canDraw) {
      room.send({
        type: "broadcast",
        event: "onMouseUp",
        data: {
          word,
          correctWord,
          players,
          selectedBy,
        },
      });
    }
    if (canDraw) {
      setStartPos(null);
      setEndPos(null);
      setIsDrawing(false);
      if (word.length > 0) {
        if (word === correctWord) {
          setCircleBgColor("green");
          onSelected && onSelected({ word, isCorrect: true });
        } else {
          setCircleBgColor("red");
          onSelected && onSelected({ word, isCorrect: false });
        }
      }
      setTimeout(() => {
        setLines([]);
        setTouchedCircles([]);
        setReducedCircleIds([]);
        setStartCirlce(null);
        setWord([]);
        setCircleBgColor(selectedBy === loggedUsername ? "blue" : "violet");
        onReset && onReset();
      }, RESET_DELAY);
    }
  };

  return (
    <svg
      ref={container}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      onTouchEnd={handleMouseUp}
      onTouchMove={handleMouseMove}
      className="rounded-lg select-none bg-slate-100"
      style={{
        height: `${CANVAS_DIMENTION}px`,
        width: `${CANVAS_DIMENTION}px`,
      }}
    >
      {lines &&
        lines.map((line, i) => (
          <LineDrawer
            strokeColor={indicatorStrokeColor}
            key={i}
            startPoint={line.startPos}
            endPoint={line.endPos}
          />
        ))}
      {isDrawing && startPos && endPos && (
        <LineDrawer
          strokeColor={indicatorStrokeColor}
          startPoint={startPos}
          endPoint={endPos && endPos}
        />
      )}
      {circles.map((circle, i) => (
        <CircleDrawer
          key={i}
          center={circle.pos}
          radius={circle.radius}
          onMouseDown={(e) => {
            handleMouseDown(circle);
          }}
          text={circle.letter}
          fontSize={LETTER_FONT_SIZE}
          circleBg={circleBgColor}
        />
      ))}
    </svg>
  );
}
