import { Router } from 'express';
import { checkIfHeaderExists } from '@v1/controllers/errorHandlers';
import { getGroupById, getProducts } from '@v1/controllers/products';
import { createProductCategory, createSuiteProduct } from '@v1/controllers/suiteCreateProducts';

const router: Router = Router();

router.get('/', checkIfHeaderExists, getProducts);
router.get('/groups/:id', checkIfHeaderExists, getGroupById);
router.post('/categories', checkIfHeaderExists, createProductCategory);
router.post('/', checkIfHeaderExists, createSuiteProduct);

export default router;
