import { Router } from 'express';
import { createNew, customersController, deleteById, getById } from 'src/v1/controllers/customers';
import { checkIfHeaderExists } from '../controllers/errorHandlers';

const router: Router = Router();

router.get('/customers', checkIfHeaderExists, customersController);
router.get('/customers/:id', checkIfHeaderExists, getById);
router.post('/customers', checkIfHeaderExists, createNew);
router.delete('/customers/:id', checkIfHeaderExists, deleteById);

export default router;
