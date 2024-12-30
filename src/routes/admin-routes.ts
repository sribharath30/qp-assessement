import { Router } from 'express';
import { AdminController } from '../controllers/admin-controller';
import { authenticate } from '../middleware/authenticate-middleware';
import { authorize } from '../middleware/authorization-middleware';

const router = Router();
const adminController = new AdminController();

router.post('/grocery-items', authenticate, authorize(['admin']), adminController.addGroceryItem);
router.get('/grocery-items', authenticate, authorize(['admin']), adminController.viewGroceryItems);
router.delete(
    '/grocery-items/:id',
    authenticate,
    authorize(['admin']),
    adminController.removeGroceryItem
);
router.patch(
    '/grocery-items/:id',
    authenticate,
    authorize(['admin']),
    adminController.updateGroceryItem
);
router.patch(
    '/grocery-items/:id/inventory',
    authenticate,
    authorize(['admin']),
    adminController.manageInventory
);

export default router;
