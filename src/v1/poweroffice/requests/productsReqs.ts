import { axiosRequest } from '../../../helpers';

export const createProduct = async (accessToken: string, args: any) => {
  const options = {
    method: 'POST',
    url: '/Product',
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    data: args,
  };
  return axiosRequest(options);
};

export const getProductList = async (accessToken: string, limit: string, skip: string) => {
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

export const getProductByCode = async (accessToken: string, code: string) => {
  const options = {
    method: 'GET',
    url: `/Product/?$filter=(tolower(Code) eq '${code}')`,
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axiosRequest(options);
};

export const getProductGroupList = async (accessToken: string, limit: string, skip: string) => {
  const options = {
    method: 'GET',
    url: `/ProductGroup/?$orderby=Code&$top=${limit}&$skip=${skip}`,
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axiosRequest(options);
};

export const deleteProductById = async (accessToken: string, id: string) => {
  const options = {
    method: 'DELETE',
    url: `/customer/${id}`,
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axiosRequest(options);
};
