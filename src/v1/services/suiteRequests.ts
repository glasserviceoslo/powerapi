import axios from 'axios';
import { ITokenResponse } from 'src/types';

const { SUITE_TOKEN_URL, SUITE_CLIENT_ID, SUITE_CLIENT_SECRET } = process.env;

export const getTokens = async () => {
  const options = {
    method: 'POST',
    url: '/Api/access_token',
    baseURL: SUITE_TOKEN_URL,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: SUITE_CLIENT_ID,
      client_secret: SUITE_CLIENT_SECRET,
    }),
  };

  const { data } = await axios.request<Omit<ITokenResponse, 'refresh_token'>>(options);
  return data;
};

export const createAccountModule = async (accessToken: string, args: any) => {
  const options = {
    method: 'POST',
    url: '/V8/module',
    baseURL: SUITE_TOKEN_URL,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data: args,
  };

  const { data } = await axios.request(options);
  return data;
};
