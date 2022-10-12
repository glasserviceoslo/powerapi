import { NextFunction, Request, Response } from 'express';
import { createTask } from '$v1/requests/svenn/tasks';

export const createNew = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { access_token } = req.headers;
    const task = await createTask(access_token, req.body);
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};
