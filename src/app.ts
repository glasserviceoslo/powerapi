import express, { Application } from 'express';
import cors from 'cors';
import poOauth from '$v1/poweroffice/routes/oauth';
import poCustomers from '$v1/poweroffice/routes/customers';
import poInvoices from '$v1/poweroffice/routes/invoices';
import poProducts from '$v1/poweroffice/routes/products';
import crmProducts from '$v1/suitecrm/routes/products';
import webhookRoutes from '$v1/webhooks/routes';
import sync from '$v1/sync/routes';
import docRoute from '$v1/docs/router';
import { errorHandler, globalErrorHandler } from '$middleware/errorHandlers';
import { forceHttps } from '$helpers';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

if (process.env.NODE_ENV !== 'production') {
  app.enable('trust proxy');
  app.use(forceHttps);
}

app.get('/v1', (req, res) => {
  console.log(
    `\x1b[33m[${new Date().toUTCString()}] \x1b[0m=>\x1b[32m The endpoint was hit!\x1b[0m`,
  );
  res.json({ message: 'Welcome to Aploskod integration API!' });
});

app.use('/v1/poweroffice/oauth', poOauth);
app.use('/v1/poweroffice/customers', poCustomers);
app.use('/v1/poweroffice/invoices', poInvoices);
app.use('/v1/poweroffice/products', poProducts);
app.use('/v1/suitecrm/products', crmProducts);
app.use('/v1/hooks', webhookRoutes);
app.use('/v1/sync', sync);
app.use('/v1/docs', docRoute);

app.use(errorHandler);
app.use(globalErrorHandler);

export default app;
