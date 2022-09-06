import { POProductsType } from '@types';
import { axiosRequest } from '@v1/services/helpers';
import { NextFunction, Request, Response } from 'express';

export const syncProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const options = {
      method: 'GET',
      url: `/products?limit=10000`,
      baseURL: process.env.POWERAPI_URL,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        access_token,
      },
    };
    const { data: products } = await axiosRequest<POProductsType>(options);
    products.forEach(async (p) => {
      const suiteOptions = {
        method: 'POST',
        url: `/products`,
        baseURL: process.env.POWERAPI_URL,
        headers: {
          'content-type': 'application/json; charset=utf-8',
          access_token,
        },
        data: p,
      };
      await axiosRequest<any>(suiteOptions);
    });
    res.json({ message: 'Sync in progress...' });
  } catch (error) {
    next(error);
  }
};
