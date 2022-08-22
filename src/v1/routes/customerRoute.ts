import { Router } from 'express';
import { createNew, customersController, deleteById, getById } from 'src/v1/controllers/customers';

const router: Router = Router();

router.get('/customers', customersController);
router.get('/customers/:id', getById);
router.post('/customers', createNew);
router.delete('/customers/:id', deleteById);

export default router;
