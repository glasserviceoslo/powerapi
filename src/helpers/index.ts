import axios, { AxiosRequestConfig } from 'axios';
import { NextFunction, Request, Response } from 'express';
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

export const forceHttps = (req: Request, res: Response, next: NextFunction) =>
  req.secure ? next() : res.redirect(`https://' + ${req.headers.host}${req.url}`);
