import { Router } from 'express';
import { checkIfHeaderExists } from '@middleware/errorHandlers';
import {
  createNew,
  deleteById,
  getGroupById,
  getProductGroups,
  productsController,
} from '@v1/poweroffice/controllers/products';

const router: Router = Router();

router.get('/', checkIfHeaderExists, productsController);
router.post('/', checkIfHeaderExists, createNew);
router.delete('/:id', checkIfHeaderExists, deleteById);
router.get('/groups/:id', checkIfHeaderExists, getGroupById);
router.get('/groups', checkIfHeaderExists, getProductGroups);

export default router;
