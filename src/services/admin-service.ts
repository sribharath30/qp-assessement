import sequelize from '../config/database';
import { GroceryItem } from '../models';
import { GroceryItemRepository } from '../respository/grocery-item-repository';
import { UpdateGroceryItem } from '../types/groceryItem';

export class AdminService {
    private groceryItemRepository: GroceryItemRepository;

    constructor() {
        this.groceryItemRepository = new GroceryItemRepository();
    }
    async addGroceryItem(item: Partial<GroceryItem>): Promise<void> {
        const transaction = await sequelize.transaction();
        try {
            await this.groceryItemRepository.addItem(item, transaction);
            await transaction.commit();
        } catch (error) {
            await transaction.rollback();
        }
    }

    async viewGroceryItems(): Promise<GroceryItem[]> {
        try {
            const items: GroceryItem[] = await this.groceryItemRepository.getItems();
            return items;
        } catch (error) {
            throw error;
        }
    }

    async removeGroceryItem(itemId: number): Promise<void> {
        const transaction = await sequelize.transaction();
        try {
            await this.groceryItemRepository.removeItem(itemId, transaction);
            await transaction.commit();
        } catch (error) {
            transaction.rollback();
        }
    }

    async updateGroceryItem(itemId: number, updateItemPayload: UpdateGroceryItem): Promise<void> {
        const transaction = await sequelize.transaction();
        try {
            await this.groceryItemRepository.updateItem(itemId, updateItemPayload, transaction);
            await transaction.commit();
        } catch (error) {
            transaction.rollback();
        }
    }

    async manageInventoryLevel(
        itemId: number,
        payload: Pick<UpdateGroceryItem, 'quantity'>
    ): Promise<void> {
        const transaction = await sequelize.transaction();
        try {
            await this.groceryItemRepository.updateItem(itemId, payload, transaction);
            await transaction.commit();
        } catch (error) {
            transaction.rollback();
        }
    }
}
