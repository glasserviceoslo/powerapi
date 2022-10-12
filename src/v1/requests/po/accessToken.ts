import { ITokenResponse } from '$types';
import { axiosRequest } from '$helpers';

export const keysToBase64 = (
  applicationKey: string,
  clientKey: string,
): string => Buffer.from(`${applicationKey}:${clientKey}`).toString('base64');

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
  return axiosRequest<ITokenResponse>(options);
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
  return axiosRequest<ITokenResponse>(options);
};
