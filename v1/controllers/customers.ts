import { NextFunction, Request, Response } from 'express';
import { createCustomer } from '../utils/customers';

export const createNewCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customer = await createCustomer(req.headers.accessToken as string, req.body);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

export const getCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const customer = await createCustomer(req.headers.accessToken as string, req.body);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};
