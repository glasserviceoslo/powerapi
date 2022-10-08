import { Router } from 'express';
import { checkIfHeaderExists } from '$middleware/errorHandlers';
import { createNew, getById, getList } from '../controllers/invoices';

const router: Router = Router();

router.get('/', checkIfHeaderExists, getList);
router.get('/:id', checkIfHeaderExists, getById);
router.post('/', checkIfHeaderExists, createNew);
router.delete('/:id', checkIfHeaderExists);

export default router;
