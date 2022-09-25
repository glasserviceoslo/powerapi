import { Router } from 'express';
import { moduleFromHook } from '../controllers/latepoint';

const router: Router = Router();

router.post('/latepoint', moduleFromHook);

export default router;
