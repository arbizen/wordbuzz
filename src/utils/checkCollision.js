export const checkCollision = (circle, point) => {
  const distance = Math.sqrt(
    Math.pow(circle.pos.x - point.x, 2) + Math.pow(circle.pos.y - point.y, 2)
  );
  return distance <= circle.radius;
};
