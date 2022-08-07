import { Router } from 'express';
import { getAuthToken } from '../v1/controllers/POoauthToken';

const router: Router = Router();

router.post('/', getAuthToken);

export default router;
