import { GroceryItem } from "../models";

export type UpdateGroceryItem= Omit<GroceryItem, 'item_id' | 'created_at' | 'updated_at'>;

export type BookOrderPayload = ItemWithQuantity[]


type ItemWithQuantity = {
    itemId: string,
    quantity: number
}
export interface FilterCondition {
    field: string;
    op: string;
    value: any;
  }