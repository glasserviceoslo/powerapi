import express, { Application } from 'express';
import cors from 'cors';
import poRoutes from './v1/routes/poRoutes';
import { errorHandler, globalErrorHandler } from './v1/controllers/errorHandlers';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use('/', poRoutes);

app.use(errorHandler);
app.use(globalErrorHandler);

export default app;
