import { NextFunction, Request, Response } from 'express';
import { createCustomer, getCustomers } from '../utils/customers';

export const createNewCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw new Error('Missing Access Token');
    }
    const customer = await createCustomer(access_token as string, req.body);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

export const getCustomerList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw new Error('Missing Access Token');
    }
    const customer = await getCustomers(access_token as string);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};
