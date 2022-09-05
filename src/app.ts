import express, { Application } from 'express';
import cors from 'cors';
import oAuthRoute from '@v1/routes/oAuthRoute';
import customerRoute from '@v1/routes/customerRoute';
import invoiceRoute from '@v1/routes/invoiceRoute';
import productRoute from '@v1/routes/productRoute';
import latepointWebhook from '@v1/routes/latepointWebhook';
import { checkIfHeaderExists, errorHandler, globalErrorHandler } from '@v1/controllers/errorHandlers';
import { axiosRequest } from '@v1/services/helpers';
import { POProductsType } from '@types';

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
app.use('/v1/products', productRoute);
app.use('/v1/latepoint', latepointWebhook);

app.get('/v1/sync', checkIfHeaderExists, async (req, res) => {
  const { access_token } = req.headers;
  const options = {
    method: 'GET',
    url: `/products`,
    baseURL: 'http://localhost:3001/v1',
    headers: {
      'content-type': 'application/json; charset=utf-8',
      access_token,
    },
  };
  const { data: products } = await axiosRequest<POProductsType>(options);
  products.forEach(async (p) => {
    const suiteOptions = {
      method: 'POST',
      url: `/products`,
      baseURL: 'http://localhost:3001/v1',
      headers: {
        'content-type': 'application/json; charset=utf-8',
        access_token,
      },
      data: p,
    };
    return axiosRequest<any>(suiteOptions);
  });
  res.json({ message: 'Sync in progress...' });
});

app.use(errorHandler);
app.use(globalErrorHandler);

export default app;
