import { axiosRequest } from '$helpers';

export const createProject = async (accessToken: string, args: any) => {
  const options = {
    method: 'POST',
    url: '/project',
    baseURL: process.env.SVENN_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
    data: args,
  };
  return axiosRequest<any>(options);
};

export const getProjects = async (
  accessToken: string,
  limit: string,
  skip: string,
) => {
  const options = {
    method: 'GET',
    url: '/Project/?',
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

export const getProjectByName = async (accessToken: string, name: string) => {
  const options = {
    method: 'GET',
    url: '/Project',
    params: new URLSearchParams(`?$filter=(tolower(Name) eq '${name}')`),
    baseURL: process.env.SVENN_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axiosRequest(options);
};

export const getProjectById = async (accessToken: string, id: string) => {
  const options = {
    method: 'GET',
    url: `/Project/${id}`,
    baseURL: process.env.SVENN_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axiosRequest(options);
};

export const deleteProjectById = async (accessToken: string, id: string) => {
  const options = {
    method: 'DELETE',
    url: `/Project/${id}`,
    baseURL: process.env.SVENN_URL,
    headers: {
      'content-type': 'application/json; charset=utf-8',
      Authorization: `Bearer ${accessToken}`,
    },
  };
  return axiosRequest(options);
};
