import express, { Application } from 'express';
import cors from 'cors';
import session from 'express-session';
import poRoutes from './v1/routes/poRoutes';
import { errorHandler, globalErrorHandler } from './v1/controllers/errorHandlers';

const app: Application = express();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.set('trust proxy', 1);
app.use(
  session({
    secret: 'secret',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: true, maxAge: 60000, path: '/v1' },
  }),
);

app.get('/v1', (_req, res) => {
  console.log('The endpoint was hit');
  res.json({ message: 'Welcome to Aploskod integration API, version 1.0!' });
});

app.use('/v1', poRoutes);
app.use(errorHandler);
app.use(globalErrorHandler);

export default app;
