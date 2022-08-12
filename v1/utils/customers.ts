import axios from 'axios';

/* eslint-disable import/prefer-default-export */
export const createCustomer = async (accessToken: string, args: any) => {
  const options = {
    method: 'POST',
    url: '/customer',
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
