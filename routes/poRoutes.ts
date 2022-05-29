import { Router } from 'express';
import { getAuthToken } from '../controllers/oauthToken';

const router: Router = Router();

router.post('/', getAuthToken);

export default router;
