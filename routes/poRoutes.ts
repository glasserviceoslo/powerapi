import { Router } from 'express';
import { getAuthToken } from '../controllers/POoauthToken';

const router: Router = Router();

router.post('/', getAuthToken);

export default router;
