import { useDrop, XYCoord } from "react-dnd";
import { BlockItem, ItemType } from "../constants";
import { useCallback, useState } from "react";
import useImmutability from "immutability-helper";
import { Button, Container } from "@mui/material";
import Block from "./Block";
import Arrow from "./Arrow";

const snapToGrid = (x: number, y: number) => {
  const snappedX = Math.round(x / 32) * 32;
  const snappedY = Math.round(y / 32) * 32;
  return { x: snappedX, y: snappedY } as XYCoord;
};

const Board: React.FC = () => {
  const [blocks, setBlocks] = useState<{ [key: string]: BlockItem }>({
    First: { type: ItemType.BLOCK, id: "First", top: 150, left: 50 },
    Name: { type: ItemType.BLOCK, id: "Name", top: 100, left: 300 },
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
    <div style={{ backgroundColor: "grey" }}>
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
              <Button>Select</Button>
              <div style={{ border: "1px solid green" }}>Area</div>
            </Block>
          );
        })}
        <Arrow id="1" start={{ x: 50, y: 150 }} end={{ x: 300, y: 100 }} />
      </Container>
    </div>
  );
};

export default Board;
