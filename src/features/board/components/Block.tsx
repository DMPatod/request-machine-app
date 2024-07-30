import { useDrag, XYCoord } from "react-dnd";
import { ItemType } from "../constants";
import { Card, CardContent, CardHeader } from "@mui/material";
import { CSSProperties } from "react";

const style: CSSProperties = {
  position: "absolute",
};

interface BlockProps {
  id: string;
  position: XYCoord;
  children?: React.ReactNode;
}

const Block: React.FC<BlockProps> = ({ id, position, children }) => {
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
    <div
      className="block"
      style={{ ...style, left: position.x, top: position.y }}
    >
      <Card>
        <CardHeader title={id} />
        <CardContent>{children}</CardContent>
      </Card>
    </div>
  );
};

export default Block;
