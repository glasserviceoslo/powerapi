import { Router } from 'express';
import { moduleFromLatepoint } from '../controllers/latepoint';

const router: Router = Router();

router.post('/latepoint', moduleFromLatepoint);

export default router;
