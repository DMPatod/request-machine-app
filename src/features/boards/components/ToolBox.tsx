import { useCallback, useContext, useState } from "react";
import { ItemAction, ItemType, ToolItemCollection } from "../constants";
import { BoardContext, BoardDispatchContext } from "../providers/BoardContext";

interface ToolBoxProps {}

const ToolBox: React.FC<ToolBoxProps> = () => {
  const items = useContext(BoardContext);
  const dispatch = useContext(BoardDispatchContext);

  const [dialogOpen, setDialogOpen] = useState(false);

  const [tools, setTools] = useState<ToolItemCollection>({
    newItem: {
      name: "Create New Item",
      action: async () => {
        const request = await fetch("/api/generator");
        if (!request.ok) {
          console.error("Failed to create new item");
          return;
        }
        const data = await request.json();

        dispatch({
          type: ItemAction.ADD_ITEM,
          payload: { id: data.id, type: ItemType.BLOCK },
        });
      },
    },
    newConnection: {
      name: "Create New Connection",
      action: useCallback(() => {
        setDialogOpen(!dialogOpen);
      }, [dialogOpen]),
    },
  });

  return (
    <div style={{ backgroundColor: "grey" }}>
      {Object.entries(tools).map(([key, tool], index) => {
        return (
          <button key={index} onClick={tool.action}>
            {tool.name}
          </button>
        );
      })}
      <dialog open={dialogOpen}>
        <p>New Connection</p>
        <form
          onSubmit={async (e: React.SyntheticEvent) => {
            e.preventDefault();
            const form = e.target as typeof e.target & {
              from: { value: string };
              to: { value: string };
            };
            const request = await fetch("/api/generator");
            if (!request.ok) {
              console.error("Failed to create new item");
              return;
            }
            const data = await request.json();

            dispatch({
              type: ItemAction.ADD_ITEM,
              payload: {
                id: data.id,
                type: ItemType.CONNECTION,
                from: form.from.value,
                to: form.to.value,
              },
            });
            setDialogOpen(false);
          }}
        >
          <div>
            <label>From</label>
            <select id="from">
              <option>Select Block</option>
              {Object.entries(items).map(([key, item], index) => {
                return (
                  <option key={index} value={key}>
                    {item.id}
                  </option>
                );
              })}
            </select>
          </div>
          <div>
            <label>To</label>
            <select id="to">
              <option>Select Block</option>
              {Object.entries(items).map(([key, item], index) => {
                return (
                  <option key={index} value={key}>
                    {item.id}
                  </option>
                );
              })}
            </select>
          </div>
          <button>Create</button>
        </form>
      </dialog>
    </div>
  );
};

export default ToolBox;
