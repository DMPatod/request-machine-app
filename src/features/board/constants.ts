export enum ItemType {
  BLOCK = "block",
}

export interface BlockItem {
  type: ItemType;
  id: string;
  top: number;
  left: number;
}
