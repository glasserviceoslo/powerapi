import { Router } from 'express';
import { getById } from '../controllers/invoices';
import { checkIfHeaderExists } from '../controllers/errorHandlers';

const router: Router = Router();

router.get('/invoices', checkIfHeaderExists);
router.get('/invoices/:id', checkIfHeaderExists, getById);
router.post('/invoices', checkIfHeaderExists);
router.delete('/invoices/:id', checkIfHeaderExists);

export default router;
