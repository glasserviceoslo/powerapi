import { Router } from 'express';
import { moduleFromHook } from '../controllers/latepointHook';

const router: Router = Router();

router.post('/', moduleFromHook);

export default router;
