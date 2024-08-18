import { useContext } from "react";
import { BoardDispatchContext } from "../providers/BoardContext";
import { ItemAction } from "../constants";

const MenuBox: React.FC = () => {
  const dispatch = useContext(BoardDispatchContext);

  return (
    <div style={{ minHeight: 48, backgroundColor: "grey" }}>
      Board Menu
      <div>
        <button
          onClick={() => {
            dispatch({ type: ItemAction.SAVE_BOARD });
          }}
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default MenuBox;
