import { AnimatePresence } from "framer-motion";
import { motion } from "framer-motion";

const Circle = ({ cx, cy, r, fill, letter, onMouseDown }) => {
  return (
    <AnimatePresence>
      <motion.g onMouseDown={onMouseDown} onTouchStart={onMouseDown}>
        <motion.circle
          initial={{
            cx: window.innerWidth / 2,
            cy: window.innerHeight / 2,
            r: 0,
            rotate: -360,
          }}
          animate={{
            cx: cx,
            cy: cy,
            r: r,
            rotate: 0,
          }}
          transition={{
            type: "spring",
            duration: 1,
          }}
          exit={{
            cx: window.innerWidth / 2,
            cy: window.innerHeight / 2,
            r: 0,
            rotate: 360,
          }}
          cx={cx}
          cy={cy}
          r={r}
          fill={fill}
        />

        <motion.text
          x={cx}
          y={cy}
          initial={{
            cx: window.innerWidth / 2,
            cy: window.innerHeight / 2,
            r: 0,
            rotate: -360,
            opacity: 0,
          }}
          transition={{
            type: "spring",
            delay: 0.5,
          }}
          animate={{
            cx: cx,
            cy: cy,
            r: r,
            rotate: 0,
            opacity: 1,
          }}
          exit={{
            cx: window.innerWidth / 2,
            cy: window.innerHeight / 2,
            r: 0,
            rotate: 360,
            opacity: 0,
          }}
          style={{
            textAnchor: "middle",
            dominantBaseline: "middle",
            fill: "white",
            fontSize: "15px",
            userSelect: "none",
          }}
        >
          {letter}
        </motion.text>
      </motion.g>
    </AnimatePresence>
  );
};

export default Circle;
