import { Transaction } from 'sequelize';
import { Order } from '../models';
import { BookOrderPayload } from '../types/groceryItem';
import { mapItemsToStringLiteral } from '../utils/create-string-literal';
import sequelize from '../config/database';

export interface IOrder {
    createOrder(item: Order, transaction: Transaction): Promise<number | undefined>;
    getOrder(orderId: number): Promise<Order | null>;
    updateOrderWithItems(
        orderId: number,
        payload: BookOrderPayload,
        transaction: Transaction
    ): Promise<void>;
}

export class OrderRepository implements IOrder {
    getOrder = async (orderId: number): Promise<Order | null> => {
        const order = await Order.findOne({ where: { order_id: orderId } });
        return order;
    };
    createOrder = async (
        order: Partial<Order>,
        transaction: Transaction
    ): Promise<number | undefined> => {
        const { order_id } = await Order.create(order, { transaction: transaction });
        return order_id;
    };
    updateOrderWithItems = async (
        orderId: number,
        payload: BookOrderPayload,
        transaction: Transaction
    ): Promise<void> => {
        const valuesString = mapItemsToStringLiteral(payload);
        const query = `
            WITH updated_inventory AS (
                UPDATE "Grocery_Items"
                SET quantity = quantity - i.requested_quantity
                FROM (VALUES ${valuesString}) AS i(item_id, requested_quantity)
                WHERE "Grocery_Items".item_id = i.item_id
                RETURNING "Grocery_Items".item_id, "Grocery_Items".price
            ),
            insert_order_items AS (
                INSERT INTO "Order_Items" (order_id, item_id, quantity, price)
                SELECT 
                    ${orderId}, 
                    ui.item_id, 
                    i.requested_quantity, 
                    i.requested_quantity * ui.price
                FROM updated_inventory ui
                JOIN (VALUES ${valuesString}) AS i(item_id, requested_quantity)
                ON ui.item_id = i.item_id
                RETURNING price
            )
            UPDATE "Orders"
            SET total_price = (
                SELECT SUM(price) 
                FROM "Order_Items"
                WHERE order_id = ${orderId}
            ),
            status = 'completed'
            WHERE order_id = ${orderId};
        `;

        await sequelize.query(query, { transaction });
    };
}
