import { ConnectionItemCollection } from "@/features/boards/constants";
import BoardContext from "@/features/boards/providers/BoardContext";
import {
  Dispatch,
  SetStateAction,
  useCallback,
  useContext,
  useState,
} from "react";
import useImmutability from "immutability-helper";

interface CreateToolProps {
  connections: ConnectionItemCollection;
  connectionsDispatch: Dispatch<SetStateAction<ConnectionItemCollection>>;
}

const CreateTool: React.FC<CreateToolProps> = ({
  connections,
  connectionsDispatch,
}) => {
  const blocks = useContext(BoardContext);

  const [from, setFrom] = useState<string>("");
  const [to, setTo] = useState<string>("");

  return (
    <div>
      <div>Create Connection</div>
      <div>
        <div>
          <label>From</label>
          <select
            onChange={(ev) => {
              setFrom(ev.target.value);
            }}
          >
            <option>Select Id</option>
            {Object.keys(blocks).map((blockId) => {
              return (
                <option key={blockId} value={blockId}>
                  {blockId}
                </option>
              );
            })}
          </select>
        </div>
        <div>
          <label>To</label>
          <select
            onChange={(ev) => {
              setTo(ev.target.value);
            }}
          >
            <option>Select Id</option>
            {Object.keys(blocks).map((blockId) => {
              return (
                <option key={blockId} value={blockId}>
                  {blockId}
                </option>
              );
            })}
          </select>
        </div>
      </div>
      <button
        onClick={useCallback(async () => {
          if (!from || !to) {
            console.log("Please select from and to");
            return;
          }

          if (from == to) {
            console.log("From and To cannot be same");
            return;
          }

          var response = await fetch("/api/generator");
          var data = await response.json();

          connectionsDispatch(
            useImmutability(connections, {
              $merge: { [data.id]: { fromId: from, toId: to } },
            })
          );
        }, [from, to])}
      >
        Create
      </button>
    </div>
  );
};

export default CreateTool;
