import { ITokenResponse } from '@types';
import { axiosRequest } from './helpers';

const { SUITE_URL, SUITE_CLIENT_ID, SUITE_CLIENT_SECRET } = process.env;

export const getTokens = async () => {
  const options = {
    method: 'POST',
    url: '/access_token',
    baseURL: SUITE_URL,
    headers: { 'content-type': 'application/x-www-form-urlencoded' },
    data: new URLSearchParams({
      grant_type: 'client_credentials',
      client_id: SUITE_CLIENT_ID,
      client_secret: SUITE_CLIENT_SECRET,
    }),
  };
  return axiosRequest<Omit<ITokenResponse, 'refresh_token'>>(options);
};

export const createAccountModule = async (accessToken: string, args: any) => {
  const options = {
    method: 'POST',
    url: '/V8/module',
    baseURL: SUITE_URL,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data: args,
  };
  return axiosRequest(options);
};

export const updateModule = async (accessToken: string, args: any) => {
  const options = {
    method: 'PATH',
    url: '/V8/module',
    baseURL: SUITE_URL,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
    data: args,
  };
  return axiosRequest(options);
};

export const getFilteredCollection = async (accessToken: string, name: string, email: string) => {
  const options = {
    method: 'GET',
    url: `/V8/module/Accounts?filter[name][eq]=${name}&filter[operator]=and&filter[email1][eq]=${email}`,
    baseURL: SUITE_URL,
    headers: {
      'content-type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axiosRequest(options);
};
