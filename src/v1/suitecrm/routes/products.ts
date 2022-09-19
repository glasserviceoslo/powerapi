import { Router } from 'express';
import { checkIfHeaderExists } from '@middleware/errorHandlers';
import { createProductCategory, createSuiteProduct } from '@v1/suitecrm/controllers/suiteProducts';

const router: Router = Router();

router.post('/categories', checkIfHeaderExists, createProductCategory);
router.get('/categories', checkIfHeaderExists, createProductCategory);
router.post('/', checkIfHeaderExists, createSuiteProduct);

export default router;
