import sequelize from '../config/database';
import { GroceryItem, Order } from '../models';
import { GroceryItemRepository } from '../respository/grocery-item-repository';
import { OrderRepository } from '../respository/order-repository';
import { BookOrderPayload, FilterCondition } from '../types/groceryItem';
import { buildWhereCondition } from '../utils/where-clause';

export class UserService {
    private groceryItemRepository: GroceryItemRepository;
    private orderRepository: OrderRepository;

    constructor() {
        this.groceryItemRepository = new GroceryItemRepository();
        this.orderRepository = new OrderRepository();
    }

    viewOrder = async (orderId: number): Promise<Order | null> => {
        try {
            const order = await this.orderRepository.getOrder(orderId);
            return order;
        } catch (error) {
            throw error;
        }
    };

    viewOrders = async (orderId: number): Promise<Order | null> => {
        try {
            const order = await this.orderRepository.getOrder(orderId);
            return order;
        } catch (error) {
            throw error;
        }
    };

    viewAvailableItems = async (filters?: FilterCondition[]): Promise<GroceryItem[]> => {
        try {
            const whereCondition = buildWhereCondition(filters || [])  ; 
            const items: GroceryItem[] = await this.groceryItemRepository.getItems(whereCondition);
            return items;
        } catch (error) {
            throw error;
        }
    };

    bookGroceryItems = async (orderId: number, payload: BookOrderPayload): Promise<void> => {
        const transaction = await sequelize.transaction();
        try {
            const order = await this.orderRepository.getOrder(orderId);
            if (!order) {
                throw new Error(`order with ${orderId} not found`);
            }

            const invalidRows = await this.groceryItemRepository.validateItemsAndStock(payload)

            if (invalidRows.length > 0) {
                throw new Error(
                    `Invalid item IDs: ${invalidRows
                        .map((row: any) => row.item_id.toString())
                        .join(', ')}`
                );
            }
            await this.orderRepository.updateOrderWithItems(orderId,payload,transaction);
            await transaction.commit()
        } catch (error) {
            transaction.rollback();
        }
    };
}
