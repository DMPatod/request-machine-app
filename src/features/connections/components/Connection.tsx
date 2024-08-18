import { useContext, useEffect, useState } from "react";
import BoardContext from "../../boards/providers/BoardContext";
import { XYCoord } from "react-dnd";

interface ConnectionProps {
  id: string;
  fromId: string;
  toId: string;
}

const pathLine = (start: XYCoord, end: XYCoord) => {
  return `M ${start.x} ${start.y} L ${end.x} ${end.y}`;
};

const pathArrow = (end: XYCoord) => {
  const arrowSize = 15;
  return `M ${end.x - arrowSize} ${end.y - arrowSize} L ${end.x} ${end.y} L ${
    end.x - arrowSize
  } ${end.y + arrowSize}`;
};

const Connection: React.FC<ConnectionProps> = ({ id, fromId, toId }) => {
  const blocks = useContext(BoardContext);

  const [start, setStart] = useState<XYCoord>({ x: 0, y: 0 });
  const [end, setEnd] = useState<XYCoord>({ x: 0, y: 0 });

  useEffect(() => {
    var fromBlock = blocks[fromId];
    var toBlock = blocks[toId];

    if (start.x !== fromBlock.left || start.y !== fromBlock.top) {
      setStart({ x: fromBlock.left, y: fromBlock.top });
    }

    if (end.x !== toBlock.left || end.y !== toBlock.top) {
      setEnd({ x: toBlock.left, y: toBlock.top });
    }
  }, [blocks]);

  return (
    <svg width="100%" height="100%">
      <path d={pathLine(start, end)} stroke="black" fill="none"></path>
      <path d={pathArrow(end)} fill="black"></path>
    </svg>
  );
};

export default Connection;
