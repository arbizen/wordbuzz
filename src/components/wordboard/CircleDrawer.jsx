export default function CircleDrawer({
  center,
  radius,
  onMouseDown,
  text,
  fontSize,
  circleBg,
}) {
  const circleStyle = {
    fill: circleBg || "white",
    filter: "drop-shadow(1px 1px 3px rgba(0,0,0,0.3))",
  };

  const textStyle = {
    textAnchor: "middle",
    dominantBaseline: "middle",
    fill: "white",
    fontSize,
  };

  return (
    <>
      <circle
        cx={center.x}
        cy={center.y}
        r={radius}
        style={circleStyle}
        onMouseDown={onMouseDown && onMouseDown}
        onTouchStart={onMouseDown && onMouseDown}
      />
      <text
        onMouseDown={onMouseDown && onMouseDown}
        onTouchStart={onMouseDown && onMouseDown}
        x={center.x}
        y={center.y}
        style={textStyle}
      >
        {text}
      </text>
    </>
  );
}
