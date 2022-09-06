import { NextFunction, Request, Response } from 'express';
import { getProductsList } from '@v1/services/productsReqs';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const { limit = '10', skip = '0' } = req.query as { [key: string]: string };
    console.log('🚀 ~ file: products.ts ~ line 8 ~ getProducts ~ limit', limit);
    const products = await getProductsList(access_token, limit, skip);
    return res.json(products);
  } catch (error) {
    return next(error);
  }
};
