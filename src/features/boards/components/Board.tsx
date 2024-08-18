import { useDrop, XYCoord } from "react-dnd";
import { BoardItem, ItemAction, ItemType } from "../constants";
import { useContext } from "react";
import DebugBoard from "@/features/debug/components/DebugBoard";
import ToolBox from "./ToolBox";
import MenuBox from "./MenuBox";
import { BlockItem } from "@/features/blocks/constants";
import { BoardContext, BoardDispatchContext } from "../providers/BoardContext";
import Block from "@/features/blocks/components/Block";
import BezierLine from "@/features/connections/components/BezierLine";

const snapToGrid = (x: number, y: number) => {
  const snappedX = Math.round(x / 32) * 32;
  const snappedY = Math.round(y / 32) * 32;
  return { x: snappedX, y: snappedY } as XYCoord;
};

const Board: React.FC = () => {
  const items = useContext(BoardContext);
  const dispatch = useContext(BoardDispatchContext);

  const [, drop] = useDrop(
    () => ({
      accept: [ItemType.BLOCK, ItemType.CONNECTION],
      drop(item: BoardItem, monitor) {
        if (item as BlockItem) {
          const block = item as BlockItem;
          const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;

          const snapped = snapToGrid(
            Math.round((block.left !== undefined ? block.left : 0) + delta.x),
            Math.round((block.top !== undefined ? block.top : 0) + delta.y)
          );

          dispatch({
            type: ItemAction.UPDATE_ITEM,
            payload: { id: block.id, top: snapped.y, left: snapped.x },
          });
        }
      },
    }),
    [items]
  );

  return (
    <div>
      <MenuBox />
      {drop(
        <div
          style={{
            minHeight: 600,
            minWidth: 800,
            position: "relative",
            backgroundSize: "32px 32px",
            backgroundImage:
              "linear-gradient(to right, grey 1px, transparent 1px), linear-gradient(to bottom, grey 1px, transparent 1px)",
          }}
        >
          {Object.entries(items).map(([id, item], index) => {
            // console.log(item);
            switch (item.type) {
              case ItemType.BLOCK:
                const block = item as BlockItem;
                return (
                  <Block
                    key={index}
                    id={id}
                    position={{ x: block.left, y: block.top }}
                  />
                );
              case ItemType.CONNECTION:
                return (
                  <BezierLine
                    key={index}
                    start={{ x: 50, y: 224 }}
                    end={{ x: 200, y: 90 }}
                  />
                );
              default:
                return <div key={index}>Error item: {item.id}</div>;
            }
          })}
        </div>
      )}

      <ToolBox />
      <DebugBoard />
    </div>
  );
};

export default Board;
