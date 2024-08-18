import { BlockItem } from "../blocks/constants";
import { ConnectionItem } from "../connections/constants";

export enum ItemType {
  BLOCK = "block",
  CONNECTION = "connection",
}

export enum ItemAction {
  ADD_ITEM = "addItem",
  REMOVE_ITEM = "removeItem",
  UPDATE_ITEM = "updateItem",
  SAVE_BOARD = "saveBoard",
}

export interface ItemDispatchAction {
  type: ItemAction;
  payload?: any;
}

export interface BoardItem {
  id: string;
  type: ItemType;
}

export interface BoardItemCollection {
  [key: string]: BoardItem | ConnectionItem | BlockItem;
}

export interface ToolItem {
  name: string;
  action: () => void;
}

export interface ToolItemCollection {
  [key: string]: ToolItem;
}
