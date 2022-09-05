import { Router } from 'express';
import { checkIfHeaderExists } from '@v1/controllers/errorHandlers';
import { getProducts } from '@v1/controllers/products';
import { createSuiteProduct } from '@v1/controllers/suiteCreateProducts';

const router: Router = Router();

router.get('/', checkIfHeaderExists, getProducts);
router.post('/', checkIfHeaderExists, createSuiteProduct);

export default router;
