import { NextFunction, Request, Response } from 'express';
import { getTokens } from '../services/suiteRequests';

export const moduleFromHook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const { customer } = req.body;
    const { access_token } = await getTokens();

    // ADD SUITE CREATE MODULE

    res.status(201).json(access_token);
  } catch (error) {
    next(error);
  }
};
