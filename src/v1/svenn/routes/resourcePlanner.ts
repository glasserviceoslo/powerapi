import { Router } from 'express';
import { checkIfHeaderExists } from '$middleware/errorHandlers';
import { createNew } from '../controllers/resourcePlanner';

const tasks: Router = Router();

tasks.post('/', checkIfHeaderExists, createNew);

export default tasks;
