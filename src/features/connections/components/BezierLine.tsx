import { XYCoord } from "react-dnd";

interface BezierLineProps {
  start: XYCoord;
  end: XYCoord;
}

const BezierLine: React.FC<BezierLineProps> = ({ start, end }) => {
  const radius = 4;

  const xyMiddle: XYCoord = {
    x: end.x - start.x,
    y: start.y,
  };

  return (
    <svg height={"100%"} width={"100%"} style={{ position: "absolute" }}>
      <path
        d={`M ${start.x} ${start.y} q ${xyMiddle.x} ${xyMiddle.y} ${
          end.x - start.x
        } ${end.y - start.y}`}
        stroke="blue"
        fill="none"
      />

      <g strokeWidth={4} fill="red">
        <circle cx={start.x} cy={start.y} r={radius} />
        <circle cx={end.x} cy={end.y} r={radius} />
      </g>
    </svg>
  );
};

export default BezierLine;
