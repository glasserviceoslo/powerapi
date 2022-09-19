import { Router } from 'express';
import { getAccessToken, refreshAccessToken } from '@v1/poweroffice/controllers/oauthToken';

const router: Router = Router();

router.post('/', getAccessToken);
router.post('/refresh', refreshAccessToken);

export default router;
