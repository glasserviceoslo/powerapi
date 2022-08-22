import { NextFunction, Request, Response } from 'express';
import {
  createCustomer,
  deleteCustomerById,
  getCustomerById,
  getCustomerByName,
  getCustomers,
} from '../utils/customersReqs';

export const createNew = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw new Error('Missing Access Token');
    }
    const customer = await createCustomer(access_token as string, req.body);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw new Error('Missing Access Token');
    }
    await deleteCustomerById(access_token as string, req.params.id);
    res.status(204);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    if (!access_token) {
      throw new Error('Missing Access Token');
    }
    const customer = await getCustomerById(access_token as string, req.params.id);
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
