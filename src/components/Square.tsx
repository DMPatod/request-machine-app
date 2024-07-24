import { Dispatch } from "react";
import Knight from "./Knight";
import { useDrop } from "react-dnd";

interface SquareProps {
  posX: number;
  posY: number;
  knightPosition: number[];
  set: Dispatch<number[]>;
}

const Square: React.FC<SquareProps> = ({
  posX,
  posY,
  knightPosition,
  set,
}: SquareProps) => {
  const [, drop] = useDrop(
    () => ({ accept: "knight", drop: () => set([posX, posY]) }),
    [posX, posY]
  );

  const black = (posX + posY) % 2 === 1;
  const fill = black ? "black" : "white";
  const stroke = black ? "white" : "black";
  const isKnightHere = knightPosition[0] === posX && knightPosition[1] === posY;

  return drop(
    <div
      style={{
        backgroundColor: fill,
        color: stroke,
        width: 33,
        height: 33,
      }}
    >
      {isKnightHere && <Knight />}
    </div>
  );
};
export default Square;
