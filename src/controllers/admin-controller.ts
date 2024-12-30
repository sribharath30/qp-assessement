import { Request, Response } from 'express';
import { AdminService } from '../services/admin-service';

export class AdminController {
    private adminService: AdminService;
    constructor() {
        this.adminService = new AdminService();
    }

    addGroceryItem = async (req: Request, res: Response) => {
        try {
            await this.adminService.addGroceryItem(req.body);
            res.status(200).send();
        } catch (error) {
            console.error('Error updating grocery item:', error);
            res.status(500).send({
                message: 'An error occurred while adding item.',
            });
        }
    };

    viewGroceryItems = async (req: Request, res: Response): Promise<void> => {
        try {
            const items = await this.adminService.viewGroceryItems();
            res.status(200).send({ items });
        } catch (error) {
            console.error('Error fetching available items:', error);
            res.status(500).send({
                message: 'An error occurred while fetching items.',
            });
        }
    };

    removeGroceryItem = async (req: Request, res: Response): Promise<void> => {
        try {
            const { id } = req.params;
            await this.adminService.removeGroceryItem(Number(id));
            res.status(204).send();
        } catch (error) {
            console.error('Error deleting available items:', error);
            res.status(500).send({
                message: 'An error occurred while deleting item.',
            });
        }
    };

    updateGroceryItem = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await this.adminService.updateGroceryItem(Number(id), req.body);
            res.status(204).send();
        } catch (error) {
            console.error('Error updating grocery item:', error);
            res.status(500).send({
                message: 'An error occurred while updating item.',
            });
        }
    };

    manageInventory = async (req: Request, res: Response) => {
        try {
            const { id } = req.params;
            await this.adminService.manageInventoryLevel(Number(id), req.body);
            res.status(204).send();
        } catch (error) {
            console.error('Error updating grocery item:', error);
            res.status(500).send({
                message: 'An error occurred while updating item.',
            });
        }
    };
}
