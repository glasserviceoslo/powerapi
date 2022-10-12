import { axiosRequest } from '$helpers';

export const createWork = async (accessToken: string, args: any) => {
  const options = {
    method: 'POST',
    url: '/work',
    baseURL: process.env.SVENN_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    data: args,
  };
  return axiosRequest(options);
};
