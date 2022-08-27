import { NextFunction, Request, Response } from 'express';
import { getInvoiceById } from '../services/invoiceReqs';

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const customer = await getInvoiceById(access_token, req.params.id);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};
