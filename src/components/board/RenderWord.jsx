import { motion } from "framer-motion";
import { useMemo, useRef, useEffect, useContext } from "react";
import { RENDER_WORD_SPACE } from "@/components/wordboard/constants";
import { useAnimationControls } from "framer-motion";
import {
  getRenderWordY,
  getRenderWordTotalDistanceWithPoints,
  getRenderWordWidth,
} from "@/utils/boardUtils";
import { BoardContext } from "@/contexts/boardContext";

const RenderWord = ({
  letters,
  word,
  position,
  boxColor,
  isVisble = true,
  isReleased,
}) => {
  const { setShowBoard, setLifeCount } = useContext(BoardContext);
  position = position || "bottom";
  boxColor = boxColor || "#3B82F6";
  //const width = 35;
  //const height = 35;
  const x = getRenderWordTotalDistanceWithPoints(word).startingPoint;
  const space = RENDER_WORD_SPACE;
  const width = useMemo(() => getRenderWordWidth(word), [word]);
  const height = width;
  const fontSize = useMemo(
    () => (Math.ceil(width * 0.6) > 15 ? 15 : Math.ceil(width * 0.6)),
    [width]
  );
  const y = useMemo(
    () => getRenderWordY(word, position, height),
    [word, position]
  );
  const isCorrect = useRef(letters === word);

  // framer hooks
  const rectAnimationControls = useAnimationControls();

  useEffect(() => {
    isCorrect.current = letters === word;
    if (letters === word && isReleased) {
      console.log("isCorrect");
      rectAnimationControls.start({
        fill: "#22C55E",
        stroke: "#22C55E",
        rotate: "360deg",
        transition: {
          duration: 1,
          type: "tween",
        },
      });
    } else {
      if (isReleased) {
        rectAnimationControls.start({
          fill: "#EF4444",
          stroke: "#EF4444",
          rotate: "360deg",
          transition: {
            duration: 1,
            type: "tween",
          },
        });
      }
    }
  }, [letters, word, isReleased]);

  return (
    <motion.g>
      {isVisble &&
        word
          .split("")
          .map((_, index) => (
            <motion.rect
              animate={rectAnimationControls}
              key={index}
              x={x + index * (width + space)}
              y={y}
              height={height}
              width={width}
              stroke={boxColor}
              rx={8}
            />
          ))}
      {isVisble &&
        letters.split("").map((letter, index) => (
          <motion.g key={index}>
            <motion.rect
              animate={rectAnimationControls}
              x={x + index * (width + space)}
              y={y}
              height={height}
              width={width}
              rx={8}
              fill={boxColor}
            />
            <motion.text
              x={x + index * (width + space)}
              y={y}
              height={10}
              transform={`translate(${width / 2}, ${height / 2})`}
              style={{
                textAnchor: "middle",
                dominantBaseline: "middle",
                fill: "white",
                fontSize: `${fontSize}px`,
                userSelect: "none",
              }}
            >
              {letter}
            </motion.text>
          </motion.g>
        ))}
    </motion.g>
  );
};

export default RenderWord;
