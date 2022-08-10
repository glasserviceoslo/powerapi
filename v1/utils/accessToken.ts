import axios from 'axios';
import parseUrlParams from './urlParams';

interface ITokenResponse {
  access_token: string;
  token_type: 'bearer';
  expires_in: number;
  refresh_token: string;
}

export const keysToBase64 = (applicationKey: string, clientKey: string): string =>
  Buffer.from(`${applicationKey}:${clientKey}`).toString('base64');

export const getTokens = async (url: string, base64: string) => {
  const params = parseUrlParams({ grant_type: 'client_credentials' }).toString();
  const options = {
    method: 'POST',
    url: `${url}/oauth/token`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${base64}`,
    },
    data: params,
  };

  const { data } = (await axios(options)) as { data: ITokenResponse };
  return data;
};

export const getTokenWithRefresh = async (url: string, base64: string, refreshToken: string) => {
  const params = parseUrlParams({
    grant_type: 'client_credentials',
    refresh_token: refreshToken,
  }).toString();
  const options = {
    method: 'POST',
    url: `${url}/oauth/token`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `bearer ${base64}`,
    },
    data: params,
  };

  const { data } = (await axios(options)) as { data: ITokenResponse };
  return data;
};
