import { Router } from 'express';
import { checkIfHeaderExists } from '$middleware/errorHandlers';
import { createNew } from '../controllers/projects';

const projects: Router = Router();

projects.post('/', checkIfHeaderExists, createNew);

export default projects;
