import { useRef, useState } from "react";
import { XYCoord } from "react-dnd";

interface ArrowProps {
  id: string;
  start: XYCoord;
  end: XYCoord;
}

const Arrow: React.FC<ArrowProps> = ({ id, start, end }) => {
  const arrowRef = useRef(null);

  const [startCoord, setStartCoord] = useState<XYCoord>({
    x: start.x,
    y: start.y,
  });
  const [endCoord, setEndCoord] = useState<XYCoord>({ x: end.x, y: end.y });

  const pathD = `M ${startCoord.x} ${startCoord.y} L ${endCoord.x} ${endCoord.y}`;

  return (
    <svg ref={arrowRef} width="100%" height="100%">
      <path d={pathD} stroke="black" fill="none"></path>
    </svg>
  );
};

export default Arrow;
