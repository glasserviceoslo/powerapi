import { Request, Response, NextFunction } from 'express';

interface IError {
  message: string;
  status?: number;
}

export const errorHandler = (
  _req: Request,
  _res: Response,
  next: NextFunction,
) => {
  const err: IError = new Error('Not Found');
  err.status = 404;
  next(err);
};

export const globalErrorHandler = (
  err: any,
  _req: Request,
  res: Response,
  _next: NextFunction,
) => res.status(err.status || 500).json({ error: err.message });
