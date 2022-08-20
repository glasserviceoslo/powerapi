import { NextFunction, Request, Response } from 'express';
import { getTokens, getTokenWithRefresh, keysToBase64 } from '@v1/utils/accessToken';

export const getAccessToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { application_key, client_key } = req.headers as { [key: string]: string };
    if (!application_key || !client_key) {
      throw new Error('Missing Application Key or Client Key');
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
      throw new Error('Missing Refresh Token in headers');
    }
    const response = await getTokenWithRefresh(refresh_token as string);
    res.json(response);
  } catch (err) {
    next(err);
  }
};
