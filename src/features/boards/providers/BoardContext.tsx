import { createContext, Dispatch, useReducer } from "react";
import {
  BoardItemCollection,
  ItemAction,
  ItemDispatchAction,
} from "../constants";
import Board from "../components/Board";
import { BlockItem } from "@/features/blocks/constants";
import useImmutability from "immutability-helper";
import { ConnectionItem } from "@/features/connections/constants";

export const BoardContext = createContext<BoardItemCollection>({});

export const BoardDispatchContext = createContext<Dispatch<ItemDispatchAction>>(
  () => {}
);

const itemsReducer = (
  items: BoardItemCollection,
  action: ItemDispatchAction
) => {
  const addItemAction = (item: any) => {
    switch (item.type) {
      case "block":
        const block = action.payload as BlockItem;
        if (items[block.id]) {
          console.error("Item already exists");
          return items;
        }
        return useImmutability(items, { $merge: { [block.id]: block } });
      case "connection":
        const connection = action.payload as ConnectionItem;
        if (items[connection.id]) {
          console.error("Item already exists");
          return items;
        }
        return useImmutability(items, {
          $merge: { [connection.id]: connection },
        });
      default:
        throw new Error("Invalid Item Type");
    }
  };

  switch (action.type) {
    case ItemAction.ADD_ITEM:
      return addItemAction(action.payload);
    case ItemAction.REMOVE_ITEM:
      console.log("Removing item");
      return items;
    case ItemAction.UPDATE_ITEM:
      if (action.payload as BlockItem) {
        const block = action.payload as BlockItem;
        if (items[block.id]) {
          return useImmutability(items, {
            [block.id]: { $merge: { top: block.top, left: block.left } },
          });
        }
        console.error("Item does not exist");
      }
      return items;
    default:
      throw new Error("Invalid action");
  }
};

export default function BoardProvider() {
  const [items, dispatch] = useReducer(itemsReducer, {});

  return (
    <BoardContext.Provider value={items}>
      <BoardDispatchContext.Provider value={dispatch}>
        <Board />
      </BoardDispatchContext.Provider>
    </BoardContext.Provider>
  );
}
