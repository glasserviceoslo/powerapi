import { NextFunction, Request, Response } from 'express';
import { createInvoice, getInvoiceById, getInvoiceList } from '@v1/services/invoiceReqs';

export const getList = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const invoices = await getInvoiceList(access_token);
    res.json(invoices);
  } catch (error) {
    next(error);
  }
};

export const getById = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const invoice = await getInvoiceById(access_token, req.params.id);
    res.json(invoice);
  } catch (error) {
    next(error);
  }
};

export const createNew = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { access_token } = req.headers;
    const invoice = await createInvoice(access_token, req.body);
    res.status(201).json(invoice);
  } catch (error) {
    next(error);
  }
};
