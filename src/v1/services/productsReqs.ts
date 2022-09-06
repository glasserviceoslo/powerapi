import { axiosRequest } from './helpers';

export const getProductsList = async (accessToken: string, limit: string, skip: string) => {
  const options = {
    method: 'GET',
    url: `/Product/?$orderby=Code&$top=${limit}&$skip=${skip}`,
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axiosRequest(options);
};

export const getProductGroupById = async (accessToken: string, id: string) => {
  const options = {
    method: 'GET',
    url: `/ProductGroup/${id}`,
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axiosRequest<any>(options);
};
