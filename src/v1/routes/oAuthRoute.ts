import { Router } from 'express';
import { getAccessToken, refreshAccessToken } from '@v1/controllers/oauthToken';

const router: Router = Router();

router.post('/oauth', getAccessToken);
router.post('/oauth/refresh', refreshAccessToken);

export default router;
