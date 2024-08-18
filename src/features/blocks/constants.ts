import { BoardItem } from "../boards/constants";

export interface BlockItem extends BoardItem {
  top: number;
  left: number;
}
