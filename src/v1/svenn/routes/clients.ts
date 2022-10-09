import { Router } from 'express';
import { checkIfHeaderExists } from '$middleware/errorHandlers';
import { createNew } from '../controllers/clients';

const clients: Router = Router();

clients.post('/', checkIfHeaderExists, createNew);

export default clients;
