import { NextFunction, Request, Response } from 'express';
import { createWork } from '$v1/requests/svenn/works';

export const createNew = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { access_token } = req.headers;
    const work = await createWork(access_token, req.body);
    res.status(201).json(work);
  } catch (error) {
    next(error);
  }
};
