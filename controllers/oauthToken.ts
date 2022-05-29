import url from 'url';
import path from 'path';
import { config } from 'dotenv';
import { NextFunction, Request, Response } from 'express';

config({ path: path.resolve(__dirname, '../.env') });

const auth_key = `${process.env.PO_APP_KEY}:${process.env.PO_CLIENT_KEY}`;
const buff = Buffer.from(auth_key);
const BASE64_AUTH = buff.toString('base64');

const params = new url.URLSearchParams({ grant_type: 'client_credentials' });

const { PO_URL } = process.env;
const options = {
  method: 'POST',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    Authorization: `Basic ${BASE64_AUTH}`,
  },
  body: params.toString(),
};

export const getToken = async (url: string) => {
  const res = await fetch(url, options);
  const data = res.json();
  return data;
};

// export const getTokenWithRefresh = async (refreshToken: string) => {
export const getAuthToken = async (
  _req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const response = await getToken(PO_URL!);
    res.json(response);
  } catch (err) {
    next(err);
  }
};
