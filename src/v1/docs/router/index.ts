import { Router } from 'express';
import { serve, setup } from 'swagger-ui-express';
import options from '@data/swagger.json';

const router: Router = Router();

router.use('/', serve);
router.get('/', setup(options));

export default router;
