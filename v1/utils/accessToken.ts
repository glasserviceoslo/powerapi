import axios from 'axios';
import parseUrlParams from './urlParams';

interface ITokenResponse {
  access_token: string;
  token_type: 'bearer';
  expires_in: number;
  refresh_token: string;
}

export const getTokens = async (url: string, base64: string) => {
  const params = parseUrlParams({ grant_type: 'client_credentials' });
  const options = {
    method: 'POST',
    url: `${url}/oauth/token`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${base64}`,
    },
    data: params.toString(),
  };

  const { data } = (await axios(options)) as { data: ITokenResponse };
  return data;
};

export const getTokenWithRefresh = async (url: string, base64: string, refreshToken: string) => {
  const params = parseUrlParams({
    grant_type: 'client_credentials',
    refresh_token: refreshToken,
  });
  const options = {
    method: 'POST',
    url: `${url}/oauth/token`,
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${base64}`,
    },
    body: params.toString(),
  };

  const { data } = (await axios(options)) as { data: ITokenResponse };
  return data;
};
