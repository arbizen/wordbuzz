import { generateCirclesForWord } from "@/utils/generateCircles";
import Setup from "@/components/Setup";
import {
  CANVAS_DIMENTION,
  CIRCLE_RADIUS,
} from "@/components/wordboard/constants";

export default function Home() {
  const WORD = "TEST";
  const circles = generateCirclesForWord(
    WORD,
    CIRCLE_RADIUS,
    CANVAS_DIMENTION,
    CANVAS_DIMENTION
  );
  return (
    <div className="flex items-center justify-center h-screen flex-col">
      <Setup word={WORD} circles={circles} />
    </div>
  );
}
