import { NextFunction, Request, Response } from 'express';
import { createCustomer, getCustomers, getCustomerByName } from 'src/v1/utils/customersReqs';

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

export const customersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw new Error('Missing Access Token');
    }

    if (req.query.name) {
      const customer = await getCustomerByName(access_token as string, req.query.name as string);
      return res.json(customer);
    }

    const customersList = await getCustomers(access_token as string);
    return res.json(customersList);
  } catch (error) {
    return next(error);
  }
};
