import axios from 'axios';
import { ITokenResponse } from 'src/types';

export const getTokens = async (clientId: string, clientSecret: string) => {
  const options = {
    method: 'POST',
    url: '/Api/access_token',
    baseURL: process.env.SUITE_TOKEN_URL,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: clientId,
      client_secret: clientSecret,
    }),
  };

  const { data } = await axios.request<Omit<ITokenResponse, 'refresh_token'>>(options);
  return data;
};
