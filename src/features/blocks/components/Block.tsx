import { useDrag, XYCoord } from "react-dnd";
import { useRef } from "react";
import { ItemType } from "@/features/boards/constants";
import "./Block.css";

interface BlockProps {
  id: string;
  position: XYCoord;
  children?: React.ReactNode;
}

const Block: React.FC<BlockProps> = ({ id, position, children }) => {
  const self = useRef<HTMLDivElement>(null);
  const anchor = useRef<HTMLDivElement>(null);

  const [, drag] = useDrag(
    () => ({
      type: ItemType.BLOCK,
      item: { id, left: position.x, top: position.y },
      collect: (monitor) => ({
        isDragging: monitor.isDragging(),
      }),
    }),
    [id, position]
  );

  return drag(
    <div className="block" style={{ left: position.x, top: position.y }}>
      <div style={{ backgroundColor: "white", padding: 10 }}>
        <div style={{ display: "flex" }}>
          <div
            ref={self}
            style={{ height: 25, width: 25, backgroundColor: "red" }}
          ></div>
          <div>Card: {id}</div>
          <button
            // onClick={() => {
            //   console.log(sink.current);
            //   var rect = sink.current?.getBoundingClientRect();
            //   console.log(rect?.x, rect?.y);
            // }}
            style={{ padding: 10 }}
          >
            Add
          </button>
          <div
            ref={anchor}
            style={{ height: 25, width: 25, backgroundColor: "red" }}
          ></div>
        </div>
        <div>{children}</div>
      </div>
    </div>
  );
};

export default Block;
