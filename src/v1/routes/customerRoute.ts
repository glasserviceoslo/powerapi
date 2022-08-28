import { Router } from 'express';
import { createNew, customersController, deleteById, getById } from 'src/v1/controllers/customers';
import { checkIfHeaderExists } from '../controllers/errorHandlers';

const router: Router = Router();

router.get('/', checkIfHeaderExists, customersController);
router.get('/:id', checkIfHeaderExists, getById);
router.post('/', checkIfHeaderExists, createNew);
router.delete('/:id', checkIfHeaderExists, deleteById);

export default router;
