import { POProductGroupT, POProductsType } from '@types';
import { axiosRequest } from '@v1/services/helpers';
import { NextFunction, Request, Response } from 'express';

export const syncProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const { limit = '10', skip = '0' } = req.query as { [key: string]: string };
    const options = {
      method: 'GET',
      url: `/products?limit=${limit}&skip=${skip}`,
      baseURL: process.env.POWERAPI_URL,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        access_token,
      },
    };
    const { data: products } = await axiosRequest<POProductsType>(options);
    const result = await Promise.all(
      products.map(async (p) => {
        const SCategoryOpts = {
          method: 'GET',
          url: '/products/categories',
          baseURL: process.env.POWERAPI_URL,
          headers: {
            'content-type': 'application/json; charset=utf-8',
            access_token,
          },
          data: { productGroupId: p.productGroupId },
        };

        const { data: category } = await axiosRequest<any>(SCategoryOpts);

        const SProductOpts = {
          method: 'POST',
          url: `/products`,
          baseURL: process.env.POWERAPI_URL,
          headers: {
            'content-type': 'application/json; charset=utf-8',
            access_token,
          },
          data: { ...p, categoryName: category.attributes.name, categoryId: category.id },
        };
        return axiosRequest<any>(SProductOpts);
      }),
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};

export const syncProductGroups = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const { limit = '10', skip = '0' } = req.query as { [key: string]: string };
    const options = {
      method: 'GET',
      url: `/products/groups?limit=${limit}&skip=${skip}`,
      baseURL: process.env.POWERAPI_URL,
      headers: {
        'content-type': 'application/json; charset=utf-8',
        access_token,
      },
    };
    const { data: groups } = await axiosRequest<POProductGroupT>(options);
    const result = await Promise.all(
      groups.map(async (g) => {
        const suiteOpts = {
          method: 'POST',
          url: '/products/categories',
          baseURL: process.env.POWERAPI_URL,
          headers: {
            'content-type': 'application/json; charset=utf-8',
            access_token,
          },
          data: { name: g.name },
        };
        await axiosRequest<any>(suiteOpts);
      }),
    );
    res.json(result);
  } catch (error) {
    next(error);
  }
};
