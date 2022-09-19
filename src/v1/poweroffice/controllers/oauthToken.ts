import { NextFunction, Request, Response } from 'express';
import { IError } from '@types';
import { getTokens, getTokenWithRefresh, keysToBase64 } from '@v1/poweroffice/requests/accessToken';

export const getAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { application_key, client_key } = req.headers;
    if (!application_key || !client_key) {
      const err: IError = new Error('Missing Application Key or Client Key');
      err.status = 400;
      next(err);
    }
    const base64 = keysToBase64(application_key, client_key);
    const response = await getTokens(base64);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

export const refreshAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { refresh_token } = req.headers;
    if (!refresh_token) {
      const err: IError = new Error('Missing Refresh Token in headers');
      err.status = 400;
      next(err);
    }
    const response = await getTokenWithRefresh(refresh_token as string);
    res.json(response);
  } catch (err) {
    next(err);
  }
};
