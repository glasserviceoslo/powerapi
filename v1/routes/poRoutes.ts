import { Router } from 'express';
import { getAuthToken } from '../controllers/POoauthToken';

const router: Router = Router();

router.get('/v1', (_req, res) =>
  res.json({ message: 'Welcome to Aploskod integration API, version 1.0!' })
);
router.post('/v1/oauth', getAuthToken);

export default router;
