import { Router } from 'express';
import { createNew, customersController, deleteById, getById } from '@v1/poweroffice/controllers/customers';
import { checkIfHeaderExists } from '@middleware/errorHandlers';

const router: Router = Router();

router.get('/', checkIfHeaderExists, customersController);
router.get('/:id', checkIfHeaderExists, getById);
router.post('/', checkIfHeaderExists, createNew);
router.delete('/:id', checkIfHeaderExists, deleteById);

export default router;
