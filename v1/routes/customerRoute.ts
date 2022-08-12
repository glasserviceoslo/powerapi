import { Router } from 'express';
import { createNewCustomer } from '../controllers/customers';

const router: Router = Router();

router.post('/customers', createNewCustomer);

export default router;
