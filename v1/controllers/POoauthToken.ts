import { NextFunction, Request, Response } from 'express';
import { getTokens, keysToBase64 } from '../utils/accessToken';

const { PO_URL } = process.env;

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

export const getAuthToken = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { application_key, client_key } = req.headers;
    if (!application_key || !client_key) {
      throw new Error('Missing Application Key or Client Key');
    }
    const base64 = keysToBase64(application_key as string, client_key as string);
    const response = await getTokens(PO_URL!, base64);
    res.json(response);
  } catch (err) {
    next(err);
  }
};

export default getAuthToken;
