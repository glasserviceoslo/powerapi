import path from 'path';
import { writeFile } from 'fs/promises';
import { NextFunction, Request, Response } from 'express';
import { createTask } from '$v1/requests/svenn/tasks';

export const createNew = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const task = await createTask(access_token, req.body);
    console.log('🚀 ~ file: tasks.ts ~ line 10 ~ createNew ~ task', task);
    writeFile(path.join(process.cwd(), 'tasks.json'), JSON.stringify(task, null, 2));
    res.status(201).json(task);
  } catch (error) {
    next(error);
  }
};
