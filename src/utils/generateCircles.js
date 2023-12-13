import { CANVAS_DIMENTION } from "@/components/wordboard/constants";

export function generateCirclesForWord(
  word,
  radius,
  canvasWidth = CANVAS_DIMENTION,
  canvasHeight = CANVAS_DIMENTION
) {
  const circles = [];
  const shuffledWord = word.split("").sort(() => Math.random() - 0.5); // Shuffle the letters
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const numCircles = shuffledWord.length;
  const angleIncrement = (2 * Math.PI) / numCircles;

  for (let i = 0; i < numCircles; i++) {
    const letter = shuffledWord[i];
    const angle = i * angleIncrement;

    const x = centerX + Math.cos(angle) * (canvasWidth / 3);
    const y = centerY + Math.sin(angle) * (canvasHeight / 3);

    const newCircle = {
      pos: { x, y },
      radius,
      letter,
      id: `${letter}_${i}`,
    };

    circles.push(newCircle);
  }

  return circles;
}
