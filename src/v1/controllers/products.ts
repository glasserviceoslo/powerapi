import { NextFunction, Request, Response } from 'express';
import { getProductsList } from '@v1/services/productsReqs';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const { limit = '0', skip = '0' } = req.params;
    const products = await getProductsList(access_token, limit, skip);
    return res.json(products);
  } catch (error) {
    return next(error);
  }
};
