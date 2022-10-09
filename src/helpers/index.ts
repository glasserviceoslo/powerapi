import axios, { AxiosRequestConfig } from 'axios';
import { writeFile } from 'fs/promises';
import path from 'path';

export const axiosRequest = async <T>(options: AxiosRequestConfig): Promise<T> => {
  try {
    const { data } = await axios.request<T>(options);
    return data;
  } catch (error: any) {
    writeFile(path.join(process.cwd(), 'powerapi.log'), `${JSON.stringify(error)}\n`);
    return error.message;
  }
};
