import { useDrop, XYCoord } from "react-dnd";
import { BlockItem, ItemType } from "../constants";
import { useCallback, useState } from "react";
import useImmutability from "immutability-helper";
import { Container } from "@mui/material";
import Block from "./Block";

const snapToGrid = (x: number, y: number) => {
  const snappedX = Math.round(x / 32) * 32;
  const snappedY = Math.round(y / 32) * 32;
  return { x: snappedX, y: snappedY } as XYCoord;
};

const Board: React.FC = () => {
  const [blocks, setBlocks] = useState<{ [key: string]: BlockItem }>({
    First: { type: ItemType.BLOCK, id: "First", top: 0, left: 0 },
    Name: { type: ItemType.BLOCK, id: "Name", top: 15, left: 45 },
  });

  const moveBlock = useCallback(
    (id: string, left: number, top: number) => {
      setBlocks(useImmutability(blocks, { [id]: { $merge: { left, top } } }));
    },
    [blocks]
  );

  const [, drop] = useDrop(
    () => ({
      accept: ItemType.BLOCK,
      drop(item: BlockItem, monitor) {
        const delta = monitor.getDifferenceFromInitialOffset() as XYCoord;

        const snapped = snapToGrid(
          Math.round(item.left + delta.x),
          Math.round(item.top + delta.y)
        );

        moveBlock(item.id, snapped.x, snapped.y);
      },
    }),
    [moveBlock]
  );

  return drop(
    <div>
      <Container
        style={{ backgroundColor: "aqua", minHeight: 300, minWidth: 100 }}
      >
        {Object.keys(blocks).map((key, index) => {
          const item = blocks[key];

          return (
            <Block
              key={index}
              id={item.id}
              position={{ x: item.left, y: item.top }}
            >
              Block
            </Block>
          );
        })}
      </Container>
    </div>
  );
};

export default Board;
