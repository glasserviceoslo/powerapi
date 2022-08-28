import axios from 'axios';

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

  const { data } = await axios.request(options);
  return data;
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

  const { data } = await axios.request(options);
  return data;
};
