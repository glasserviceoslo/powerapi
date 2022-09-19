import express, { Application } from 'express';
import cors from 'cors';
import poOauth from '@v1/poweroffice/routes/oauth';
import poCustomers from '@v1/poweroffice/routes/customers';
import poInvoices from '@v1/poweroffice/routes/invoices';
import poProducts from '@v1/poweroffice/routes/products';
import crmProducts from '@v1/suitecrm/routes/products';
import latepointWebhook from '@v1/suitecrm/routes/latepointWebhook';
import { checkIfHeaderExists, errorHandler, globalErrorHandler } from '@middleware/errorHandlers';
import { syncProductGroups, syncProducts } from '@v1/poweroffice/controllers/syncProducts';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/v1', (_req, res) => {
  console.log(`\x1b[33m[${new Date().toUTCString()}] \x1b[0m=>\x1b[32m The endpoint was hit!\x1b[0m`);
  res.json({ message: 'Welcome to Aploskod integration API!' });
});

app.use('/v1/poweroffice/oauth', poOauth);
app.use('/v1/poweroffice/customers', poCustomers);
app.use('/v1/poweroffice/invoices', poInvoices);
app.use('/v1/poweroffice/products', poProducts);
app.use('/v1/suitecrm/products', crmProducts);
app.use('/v1/latepoint', latepointWebhook);

app.get('/v1/products/sync', checkIfHeaderExists, syncProducts);
app.get('/v1/groups/sync', checkIfHeaderExists, syncProductGroups);

app.use(errorHandler);
app.use(globalErrorHandler);

export default app;
