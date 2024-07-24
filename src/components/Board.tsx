import { useState } from "react";
import Square from "./Square";
import { DndProvider } from "react-dnd";
import { HTML5Backend } from "react-dnd-html5-backend";

const Board: React.FC = () => {
  // const [selectedSquare, setSelectedSquare] = useState<number | null>(null);
  const [knightPosition, setKnightPosition] = useState([7, 4]);

  const squares = Array.from({ length: 64 }, (_, i) => {
    return (
      <Square
        key={i}
        posX={i % 8}
        posY={Math.floor(i / 8)}
        knightPosition={knightPosition}
        set={setKnightPosition}
      />
    );
  });

  return (
    <div>
      <DndProvider backend={HTML5Backend}>
        <div
          style={{
            maxWidth: 33 * 8,
            display: "flex",
            flexWrap: "wrap",
          }}
        >
          {squares}
        </div>
      </DndProvider>
      {/* <span>Selected: {selectedSquare}</span> */}
    </div>
  );
};

export default Board;
