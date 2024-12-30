import { Transaction } from 'sequelize';
import { GroceryItem } from '../models';
import { BookOrderPayload, UpdateGroceryItem } from '../types/groceryItem';
import { mapItemsToStringLiteral } from '../utils/create-string-literal';
import sequelize from '../config/database';

export interface IGroceryItem {
    addItem(item: GroceryItem, transaction: Transaction): Promise<number | undefined>;
    getItems(transaction: Transaction): Promise<GroceryItem[]>;
    removeItem(itemId: number, transaction: Transaction): Promise<boolean>;
    updateItem(itemId: number, item: Partial<GroceryItem>, transaction: Transaction): Promise<void>;
    validateItemsAndStock(values: BookOrderPayload): Promise<void>;
}

export class GroceryItemRepository implements IGroceryItem {
    addItem = async (
        item: Partial<GroceryItem>,
        transaction: Transaction
    ): Promise<number | undefined> => {
        const val = await GroceryItem.create(item, { transaction });
        return val.item_id;
    };

    getItems = async (filter?: Record<string, any>): Promise<GroceryItem[]> => {
        const queryOptions: any = {};

        if (filter && Object.keys(filter).length > 0) {
            queryOptions['where'] = filter;
        }
        const items = await GroceryItem.findAll(queryOptions);
        return items;
    };
    removeItem = async (itemId: number, transaction: Transaction): Promise<boolean> => {
        const val = await GroceryItem.destroy({
            where: {
                item_id: itemId,
            },
            transaction: transaction,
        });
        return val > 0;
    };
    updateItem = async (
        itemId: number,
        item: Partial<UpdateGroceryItem>,
        transaction: Transaction
    ): Promise<void> => {
        const itemToUpdate = await GroceryItem.findOne({
            where: { item_id: itemId },
        });
        if (!itemToUpdate) {
            throw new Error(`Item with id: ${itemId} not found`);
        }
        await GroceryItem.update(item, {
            where: { item_id: itemId },
            transaction: transaction,
        });
    };
    validateItemsAndStock = async (values: BookOrderPayload): Promise<any> => {
        const valuesString = mapItemsToStringLiteral(values);
        const query = `
            SELECT i.item_id
            FROM (VALUES ${valuesString}) AS i(item_id, requested_quantity)
            LEFT JOIN "Grocery_Items" gi 
            ON gi.item_id = i.item_id
            WHERE gi.item_id IS NULL;
        `;
        const [result] = await sequelize.query(query);
        return result.map((row: any) => row.item_id);
    };
}
