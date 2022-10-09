import { axiosRequest } from '$helpers';

export const createClient = async (accessToken: string, args: any) => {
  const options = {
    method: 'POST',
    url: '/client',
    baseURL: process.env.SVENN_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    data: args,
  };
  return axiosRequest<any>(options);
};

export const getClients = async (accessToken: string, limit: string, skip: string) => {
  const options = {
    method: 'GET',
    url: '/Client/?',
    params: new URLSearchParams({
      $orderby: 'Code',
      $top: limit,
      $skip: skip,
    }),
    baseURL: process.env.SVENN_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axiosRequest(options);
};

export const getClientByName = async (accessToken: string, name: string) => {
  const options = {
    method: 'GET',
    url: '/Client',
    params: new URLSearchParams(`?$filter=(tolower(Name) eq '${name}')`),
    baseURL: process.env.SVENN_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axiosRequest(options);
};

export const getClientById = async (accessToken: string, id: string) => {
  const options = {
    method: 'GET',
    url: `/Client/${id}`,
    baseURL: process.env.SVENN_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axiosRequest(options);
};

export const deleteClientById = async (accessToken: string, id: string) => {
  const options = {
    method: 'DELETE',
    url: `/Client/${id}`,
    baseURL: process.env.SVENN_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axiosRequest(options);
};
