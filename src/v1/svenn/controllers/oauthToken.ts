import { NextFunction, Request, Response } from 'express';
import { getToken } from '$v1/requests/svenn/accessToken';

export const getAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await getToken();
    res.status(201).json(response);
  } catch (err) {
    next(err);
  }
};
