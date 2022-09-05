import { Router } from 'express';
import { createNew, getById, getList } from '@v1/controllers/invoices';
import { checkIfHeaderExists } from '@v1/controllers/errorHandlers';

const router: Router = Router();

router.get('/', checkIfHeaderExists, getList);
router.get('/:id', checkIfHeaderExists, getById);
router.post('/', checkIfHeaderExists, createNew);
router.delete('/:id', checkIfHeaderExists);

export default router;
