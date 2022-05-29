import express from 'express';
import { Request, Response, Application } from 'express';
import cors from 'cors';
import { getToken } from './controllers/authorisation';

const app: Application = express();

app.use(cors());
app.use(express.json());

app.get('/', async (_req: Request, res: Response) => {
  const response = await getToken();
  console.log(response);
  res.json(response);
});

export default app;
