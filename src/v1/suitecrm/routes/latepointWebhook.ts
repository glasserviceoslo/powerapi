import { Router } from 'express';
import { moduleFromHook } from '@v1/suitecrm/controllers/latepointHook';

const router: Router = Router();

router.post('/', moduleFromHook);

export default router;
