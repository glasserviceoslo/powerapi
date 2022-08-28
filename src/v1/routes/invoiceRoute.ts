import { Router } from 'express';
import { createNew, getById } from '../controllers/invoices';
import { checkIfHeaderExists } from '../controllers/errorHandlers';

const router: Router = Router();

router.get('/:id', checkIfHeaderExists, getById);
router.post('/', checkIfHeaderExists, createNew);
router.delete('/:id', checkIfHeaderExists);

export default router;
