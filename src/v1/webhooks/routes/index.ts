import { Router } from 'express';
import { moduleFromLatepoint } from '../controllers/latepoint';
import { latepointToSvenn } from '../controllers/svenn';

const hooks: Router = Router();

hooks.post('/latepoint', moduleFromLatepoint);
hooks.post('/svenn', latepointToSvenn);

export default hooks;
