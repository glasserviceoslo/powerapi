import { Router } from 'express';
import { moduleFromHook } from '@v1/controllers/latepointHook';

const router: Router = Router();

router.post('/', moduleFromHook);

export default router;
