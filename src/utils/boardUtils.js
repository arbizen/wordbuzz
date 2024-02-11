import { RENDER_WORD_SPACE } from "@/components/board/constants";
export function getRenderWordY(word, position, height) {
  const y = window.innerHeight / 2;
  switch (position) {
    case "top":
      return y - getRadius(word) - 50 - height;
    case "bottom":
      return y + getRadius(word) + 50;
    case "center":
      return y - height / 2;
  }
}

export function getRenderWordTotalDistanceWithPoints(word) {
  const r = getRadius(word);
  const w = window.innerWidth;
  const offsetFromCenter =
    w < 500 && word.length > 15 ? w / 2 - r : word.length < 15 ? 0 : 100;
  const x1 = w / 2 - r - offsetFromCenter;
  const x2 = w / 2 + r + offsetFromCenter;
  return {
    startingPoint: x1,
    endingPoint: x2,
    distance: x2 - x1,
  };
}

export function getRenderWordWidth(word) {
  const space = RENDER_WORD_SPACE;
  const width = Math.abs(
    getRenderWordTotalDistanceWithPoints(word).distance / word.length - space
  );
  return width;
}

export function generateCirclesForWord(
  word,
  radius,
  canvasWidth,
  canvasHeight
) {
  const circles = [];
  const shuffledWord = word; // Shuffle the letters
  const centerX = canvasWidth / 2;
  const centerY = canvasHeight / 2;
  const numCircles = shuffledWord.length;
  const angleIncrement = (2 * Math.PI) / numCircles;

  for (let i = 0; i < numCircles; i++) {
    const letter = shuffledWord[i];
    const angle = i * angleIncrement;

    const outerRadius = getRadius(shuffledWord);

    const x = centerX + Math.cos(angle) * outerRadius;
    const y = centerY + Math.sin(angle) * outerRadius;

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

export function getRadius(word) {
  const windowWidth = window.innerWidth;

  if (windowWidth < 500) {
    if (word.length < 5) {
      return 80;
    } else if (word.length <= 10) {
      return 130;
    } else if (word.length <= 20) {
      return 150;
    } else {
      return word.length * 10;
    }
  } else {
    if (word.length < 5) {
      return 150;
    } else if (word.length < 10) {
      return 200;
    } else {
      return word.length * 15;
    }
  }
}

export function checkLineCircleIntersection(
  lineX1,
  lineY1,
  lineX2,
  lineY2,
  circleCX,
  circleCY,
  circleRadius
) {
  const dx = lineX2 - lineX1;
  const dy = lineY2 - lineY1;
  const a = dx * dx + dy * dy;
  const b = 2 * (dx * (lineX1 - circleCX) + dy * (lineY1 - circleCY));
  const c =
    circleCX * circleCX +
    circleCY * circleCY +
    lineX1 * lineX1 +
    lineY1 * lineY1 -
    2 * (circleCX * lineX1 + circleCY * lineY1) -
    circleRadius * circleRadius;
  const delta = b * b - 4 * a * c;

  if (delta < 0) {
    return false;
  } else {
    const t1 = (-b - Math.sqrt(delta)) / (2 * a);
    const t2 = (-b + Math.sqrt(delta)) / (2 * a);
    if (t1 >= 0 && t1 <= 1) {
      return true;
    }
    if (t2 >= 0 && t2 <= 1) {
      return true;
    }
    return false;
  }
}
