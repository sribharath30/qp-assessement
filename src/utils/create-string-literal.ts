import { BookOrderPayload } from "../types/groceryItem";

export const mapItemsToStringLiteral = (items: BookOrderPayload): string => {
    return items
        .map(item => `(${item.itemId}, ${item.quantity})`)
        .join(", ");
};