export default function LineDrawer({ startPoint, endPoint, strokeColor }) {
  const lineStyle = {
    stroke: strokeColor,
    strokeWidth: 5,
    strokeLinecap: "round",
  };

  return (
    <>
      <line
        x1={startPoint.x}
        y1={startPoint.y}
        x2={endPoint.x}
        y2={endPoint.y}
        style={lineStyle}
      />
      {/* <text
        x={endPoint.x}
        y={endPoint.y}
        style={{
          textAnchor: "middle",
          dominantBaseline: "middle",
          fill: "red",
          fontSize: 20,
        }}
      >{`(${endPoint.x}, ${endPoint.y})`}</text> */}
    </>
  );
}
