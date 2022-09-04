import { NextFunction, Request, Response } from 'express';
import { getTokens } from '../services/suiteRequests';

export const createNew = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { client_id, client_secret } = req.headers;
    const { access_token } = await getTokens(client_id, client_secret);

    // ADD SUITE CREATE MODULE

    res.status(201).json(access_token);
  } catch (error) {
    next(error);
  }
};
