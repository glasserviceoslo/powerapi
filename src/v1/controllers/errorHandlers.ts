import { Request, Response, NextFunction } from 'express';
import { IError } from 'src/types';

export const errorHandler = (_req: Request, _res: Response, next: NextFunction) => {
  const err: IError = new Error('Not Found');
  err.status = 404;
  next(err);
};

export const checkIfHeaderExists = (req: Request, res: Response, next: NextFunction) => {
  if (!req.headers.access_token) {
    const err: IError = new Error('Missing Access Token');
    err.status = 400;
    next(err);
  }
  next();
};

// eslint-disable-next-line @typescript-eslint/no-unused-vars
export const globalErrorHandler = (err: any, _req: Request, res: Response, _next: NextFunction) =>
  res.status(err.status || 500).json({ error: err.message });
