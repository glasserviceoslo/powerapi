import { NextFunction, Request, Response } from 'express';
import {
  createCustomer,
  deleteCustomerById,
  getCustomerById,
  getCustomerByName,
  getCustomers,
} from '../services/customersReqs';

interface IReqHeaders {
  [key: string]: string;
}

export const createNew = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers as IReqHeaders;
    const customer = await createCustomer(access_token, req.body);
    res.status(201).json(customer);
  } catch (error) {
    next(error);
  }
};

export const deleteById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers as IReqHeaders;
    const deleted = await deleteCustomerById(access_token, req.params.id);
    res.status(204).json(deleted);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers as IReqHeaders;
    const customer = await getCustomerById(access_token, req.params.id);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};

export const customersController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers as IReqHeaders;

    if (req.query.name) {
      const customer = await getCustomerByName(access_token, req.query.name as string);
      return res.json(customer);
    }
    const customersList = await getCustomers(access_token);
    return res.json(customersList);
  } catch (error) {
    return next(error);
  }
};
