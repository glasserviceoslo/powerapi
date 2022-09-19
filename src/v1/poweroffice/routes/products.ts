import { Router } from 'express';
import { checkIfHeaderExists } from '@middleware/errorHandlers';
import { getGroupById, getProductGroups, productsController } from '@v1/poweroffice/controllers/products';

const router: Router = Router();

router.get('/', checkIfHeaderExists, productsController);
router.post('/', checkIfHeaderExists);
router.get('/groups/:id', checkIfHeaderExists, getGroupById);
router.get('/groups', checkIfHeaderExists, getProductGroups);

export default router;
