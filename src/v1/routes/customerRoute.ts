import { Router } from 'express';
import { createNewCustomer, customersController } from 'src/v1/controllers/customers';

const router: Router = Router();

router.get('/customers', customersController);
router.post('/customers', createNewCustomer);

export default router;
