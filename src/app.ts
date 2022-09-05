import express, { Application } from 'express';
import cors from 'cors';
import oAuthRoute from '@v1/routes/oAuthRoute';
import customerRoute from '@v1/routes/customerRoute';
import invoiceRoute from '@v1/routes/invoiceRoute';
import latepointWebhook from '@v1/routes/latepointWebhook';
import { errorHandler, globalErrorHandler } from '@v1/controllers/errorHandlers';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/v1', (_req, res) => {
  console.log(`\x1b[33m[${new Date().toUTCString()}] \x1b[0m=>\x1b[32m The endpoint was hit\x1b[0m`);
  res.json({ message: 'Welcome to Aploskod integration API!' });
});

app.use('/v1/oauth', oAuthRoute);
app.use('/v1/customers', customerRoute);
app.use('/v1/invoices', invoiceRoute);
app.use('/v1/latepoint', latepointWebhook);
app.use(errorHandler);
app.use(globalErrorHandler);

export default app;
