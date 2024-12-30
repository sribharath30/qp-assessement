import { Router } from 'express';
import { UserController } from '../controllers/user-controller';
import { authenticate } from '../middleware/authenticate-middleware';
import { authorize } from '../middleware/authorization-middleware';

const router = Router();
const userController = new UserController();

router.get('/items', authenticate, authorize(['admin', 'user']), userController.viewAvailableItems);
router.get(
    '/orders',
    authenticate,
    authorize(['admin', 'user']),
    userController.viewOrder
);
router.get(
    '/orders/:orderId',
    authenticate,
    authorize(['admin', 'user']),
    userController.viewOrder
);
router.post(
    '/orders/:orderId',
    authenticate,
    authorize(['admin', 'user']),
    userController.bookGroceryItems
);

export default router;
