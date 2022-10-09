import { NextFunction, Request, Response } from 'express';
import path from 'path';
import { writeFile } from 'fs/promises';
import { createClient } from '$v1/requests/svenn/clients';

export const createNew = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const client = await createClient(access_token, req.body);
    writeFile(path.join(process.cwd(), 'clients.json'), JSON.stringify(client, null, 2));
    res.status(201).json(client);
  } catch (error) {
    next(error);
  }
};
