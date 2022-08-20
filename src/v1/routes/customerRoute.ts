import { Router } from 'express';
import { createNewCustomer, getCustomerList } from 'src/v1/controllers/customers';

const router: Router = Router();

router.get('/customers', getCustomerList);
router.post('/customers', createNewCustomer);

export default router;
