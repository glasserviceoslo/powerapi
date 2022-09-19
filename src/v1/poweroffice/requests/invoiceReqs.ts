import { axiosRequest } from '@helpers';

export const getInvoiceById = async (accessToken: string, id: string) => {
  const options = {
    method: 'GET',
    url: `/OutgoingInvoice/${id}`,
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axiosRequest(options);
};

export const getInvoiceList = async (accessToken: string) => {
  const options = {
    method: 'GET',
    url: '/OutgoingInvoice/List',
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axiosRequest(options);
};

export const createInvoice = async (accessToken: string, args: any) => {
  const options = {
    method: 'POST',
    url: '/OutgoingInvoice',
    baseURL: process.env.PO_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    data: args,
  };
  return axiosRequest(options);
};
