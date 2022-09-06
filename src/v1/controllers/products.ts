import { NextFunction, Request, Response } from 'express';
import { getProductGroupById, getProductsList } from '@v1/services/productsReqs';

export const getProducts = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const { limit = '10', skip = '0' } = req.query as { [key: string]: string };
    const products = await getProductsList(access_token, limit, skip);
    return res.json(products);
  } catch (error) {
    return next(error);
  }
};

export const getGroupById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const customer = await getProductGroupById(access_token, req.params.id);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};
