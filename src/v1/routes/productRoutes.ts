import { Router } from 'express';
import { checkIfHeaderExists } from '@v1/controllers/errorHandlers';
import { getProducts } from '@v1/controllers/products';

const router: Router = Router();

router.get('/', checkIfHeaderExists, getProducts);

export default router;
