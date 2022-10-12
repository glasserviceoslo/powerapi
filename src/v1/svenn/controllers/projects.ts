import { NextFunction, Request, Response } from 'express';
import { createProject } from '$v1/requests/svenn/projects';

export const createNew = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { access_token } = req.headers;
    const project = await createProject(access_token, req.body);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};
