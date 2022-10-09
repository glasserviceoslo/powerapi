import { NextFunction, Request, Response } from 'express';
import {
  createCustomer,
  deleteCustomerById,
  getCustomerById,
  getCustomerByName,
  getCustomers,
} from '$v1/requests/po/customersReqs';

export const createNew = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const customer = await createCustomer(access_token, req.body);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const deleted = await deleteCustomerById(access_token, req.params.id);
    res.status(204).json(deleted);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const customer = await getCustomerById(access_token, req.params.id);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

export const customersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;

    if (req.query.name) {
      const customer = await getCustomerByName(access_token, req.query.name as string);
      return res.json(customer);
    }
    const { limit = '10', skip = '0' } = req.query as { [key: string]: string };
    const customersList = await getCustomers(access_token, limit, skip);
    return res.json(customersList);
  } catch (error) {
    return next(error);
  }
};
