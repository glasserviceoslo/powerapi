import { axiosRequest } from '$helpers';

export const getToken = async () => {
  const options = {
    method: 'POST',
    url: '/login',
    baseUrl: process.env.SVENN_URL,
    headers: {
      Accept: 'application/json',
      'Content-Type': 'application/json',
    },
    data: new URLSearchParams({
      email: process.env.SVENN_USER,
      password: process.env.SVENN_USER_PASS,
    }),
  };
  return axiosRequest<any>(options);
};
