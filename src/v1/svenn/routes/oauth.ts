import { Router } from 'express';
import { getAccessToken } from '../controllers/oauthToken';

const auth: Router = Router();

auth.post('/', getAccessToken);

export default auth;
