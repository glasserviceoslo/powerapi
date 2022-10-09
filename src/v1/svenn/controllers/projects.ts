import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { writeFile } from 'fs/promises';
import { createProject } from '$v1/requests/svenn/projects';

export const createNew = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const project = await createProject(access_token, req.body);
    writeFile(path.join(process.cwd(), 'projects.json'), JSON.stringify(project, null, 2));
    console.log('🚀 ~ file: projects.ts ~ line 8 ~ createNew ~ project', project);
    res.status(201).json(project);
  } catch (error) {
    next(error);
  }
};
