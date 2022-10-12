import { axiosRequest } from '$helpers';

export const createTask = async (accessToken: string, args: any) => {
  const options = {
    method: 'POST',
    url: '/task',
    baseURL: process.env.SVENN_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    data: args,
  };
  return axiosRequest<any>(options);
};
