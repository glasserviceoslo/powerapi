import { Router } from 'express';
import { createNew, getById, getList } from '../controllers/invoices';
import { checkIfHeaderExists } from '../controllers/errorHandlers';

const router: Router = Router();

router.get('/', checkIfHeaderExists, getList);
router.get('/:id', checkIfHeaderExists, getById);
router.post('/', checkIfHeaderExists, createNew);
router.delete('/:id', checkIfHeaderExists);

export default router;
