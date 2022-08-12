import { Router } from 'express';
import { createNewCustomer } from '../controllers/customers';
import { getAccessToken, refreshAccessToken } from '../controllers/POoauthToken';

const router: Router = Router();

router.post('/oauth', getAccessToken);
router.post('/oauth/refresh', refreshAccessToken);
router.post('/customers', createNewCustomer);

export default router;
