import { motion } from "framer-motion";

const Polyline = ({ points, strokeColor }) => {
  strokeColor = strokeColor || "white";
  return (
    <motion.polyline
      points={points}
      stroke={strokeColor}
      strokeWidth="3"
      fill="none"
    />
  );
};

export default Polyline;
