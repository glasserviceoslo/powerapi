import { Router } from 'express';
import { createNew, getById, getList } from '@v1/poweroffice/controllers/invoices';
import { checkIfHeaderExists } from '@middleware/errorHandlers';

const router: Router = Router();

router.get('/', checkIfHeaderExists, getList);
router.get('/:id', checkIfHeaderExists, getById);
router.post('/', checkIfHeaderExists, createNew);
router.delete('/:id', checkIfHeaderExists);

export default router;
