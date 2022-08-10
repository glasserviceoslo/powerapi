import { NextFunction, Request, Response } from 'express';
import { getTokens } from '../utils/accessToken';

const { PO_URL, PO_APP_KEY, PO_CLIENT_KEY } = process.env;
const BASE64_AUTH = Buffer.from(`${PO_APP_KEY}:${PO_CLIENT_KEY}`).toString('base64');

// const getAccessToken = async (req: Request, res: Response, next: NextFunction) => {
//   try {
//     const { access_token, refresh_token } = await getTokens(PO_URL!, BASE64_AUTH);
//     res.locals.accessToken = access_token;
//     res.locals.refreshToken = refresh_token;
//     next();
//   } catch (error) {
//     next(error);
//   }
// };

export const getAuthToken = async (_req: Request, res: Response, next: NextFunction) => {
  try {
    const response = await getTokens(PO_URL!, BASE64_AUTH);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

export default getAuthToken;
