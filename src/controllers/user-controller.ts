import { Request, Response } from 'express';
import { UserService } from '../services/user-service';
export class UserController {
    private userService: UserService;
    constructor() {
        this.userService = new UserService();
    }
    viewAvailableItems = async (req: Request, res: Response): Promise<void> => {
        try {
            const items = await this.userService.viewAvailableItems([
                {
                    field: 'quantity',
                    op: '>',
                    value: 0,
                },
            ]);
            res.status(200).send({ items });
        } catch (error) {
            console.error('Error fetching available items:', error);
            res.status(500).send({
                message: 'An error occurred while fetching items.',
            });
        }
    };

    viewOrders = async (req: Request, res: Response): Promise<void> => {
        try {
            const { orderId } = req.params;
            const order = await this.userService.viewOrder(Number(orderId));
            res.status(200).send({ order });
        } catch (error) {
            console.error('Error fetching order:', error);
            res.status(500).send({
                message: 'An error occurred while fetching order.',
            });
        }
    };

    viewOrder = async (req: Request, res: Response): Promise<void> => {
        try {
            const { orderId } = req.params;
            const order = await this.userService.viewOrder(Number(orderId));
            res.status(200).send({ order });
        } catch (error) {
            console.error('Error fetching order:', error);
            res.status(500).send({
                message: 'An error occurred while fetching order.',
            });
        }
    };

    bookGroceryItems = async (req: Request, res: Response): Promise<void> => {
        try {
            const { orderId } = req.params;
            const items = req.body.items ?? [];
            await this.userService.bookGroceryItems(Number(orderId), items);
            res.status(200).send({ message: 'Item booked successfully' });
        } catch (error) {
            console.error('Error booking item:', error);
            res.status(500).send({
                message: 'An error occurred while booking the item.',
            });
        }
    };
}
