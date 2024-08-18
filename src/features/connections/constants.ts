import { BoardItem } from "../boards/constants";

export interface ConnectionItem extends BoardItem {
  fromId: string;
  toId: string;
}
