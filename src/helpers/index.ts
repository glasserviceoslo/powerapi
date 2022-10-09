import axios, { AxiosRequestConfig } from 'axios';

export const axiosRequest = async <T>(options: AxiosRequestConfig): Promise<T> => {
  try {
    const data = await axios<T>(options);
    console.log('🚀 ~ file: index.ts ~ line 6 ~ axiosRequest ~ data', data);
    return data.data;
  } catch (error: any) {
    console.log('🚀 ~ file: index.ts ~ line 8 ~ axiosRequest ~ error', error);
    return error.message;
  }
};
