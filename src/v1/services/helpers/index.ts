import axios, { AxiosRequestConfig } from 'axios';

export const axiosRequest = async <T>(options: AxiosRequestConfig) => {
  try {
    const { data } = await axios.request<T>(options);
    return data;
  } catch (error: any) {
    return error.message;
  }
};
