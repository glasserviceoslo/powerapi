import { Router } from 'express';
import { checkIfHeaderExists } from '$middleware/errorHandlers';
import { createNew } from '../controllers/clients';

const router: Router = Router({ mergeParams: true });

router.post('/', checkIfHeaderExists, createNew);

export default router;
