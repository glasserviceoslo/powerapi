import { NextFunction, Request, Response } from 'express';
import {
  createProduct,
  deleteProductById,
  getProductByCode,
  getProductGroupById,
  getProductGroupList,
  getProductList,
} from '../requests/productsReqs';

export const createNew = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const customer = await createProduct(access_token, req.body);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const deleted = await deleteProductById(access_token, req.params.id);
    res.status(204).json(deleted);
  } catch (error) {
    next(error);
  }
};

export const getProductGroups = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const { limit = '10', skip = '0' } = req.query as { [key: string]: string };
    const groups = await getProductGroupList(access_token, limit, skip);
    return res.json(groups);
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

export const productsController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;

    if (req.query.code) {
      const customer = await getProductByCode(access_token, req.query.code as string);
      return res.json(customer);
    }
    const { limit = '10', skip = '0' } = req.query as { [key: string]: string };
    const products = await getProductList(access_token, limit, skip);
    return res.json(products);
  } catch (error) {
    return next(error);
  }
};
