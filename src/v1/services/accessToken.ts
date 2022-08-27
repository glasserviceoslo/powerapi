import axios from 'axios';
import { ITokenResponse } from 'src/types';

export const keysToBase64 = (applicationKey: string, clientKey: string): string =>
  Buffer.from(`${applicationKey}:${clientKey}`).toString('base64');

export const getTokens = async (base64: string) => {
  const options = {
    method: 'POST',
    url: '/oauth/token',
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
      Authorization: `Basic ${base64}`,
    },
    data: new URLSearchParams({ grant_type: 'client_credentials' }),
  };

  const { data } = await axios.request<ITokenResponse>(options);
  return data;
};

export const getTokenWithRefresh = async (refreshToken: string) => {
  const options = {
    method: 'POST',
    url: '/oauth/token',
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/x-www-form-urlencoded; charset=utf-8',
    },
    data: new URLSearchParams({
      grant_type: 'refresh_token',
      refresh_token: refreshToken,
    }),
  };

  const { data } = await axios.request<ITokenResponse>(options);
  return data;
};
