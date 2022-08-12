/* eslint-disable import/prefer-default-export */
import { NextFunction, Request, Response } from 'express';
// import { IncomingHttpHeaders } from 'http';
// import { getTokens, keysToBase64 } from '../utils/accessToken';
// import { IRequestHeaders } from '../../types';
import { createCustomer } from '../utils/customers';

export const createNewCustomer = async (req: Request, res: Response, next: NextFunction) => {
  try {
    // const { application_key, client_key } = req.headers as IncomingHttpHeaders & IRequestHeaders;
    // const base64 = keysToBase64(application_key, client_key);
    console.log('🚀 ~ file: customers.ts ~ line 13 ~ createNewCustomer ~ req.session', req.session);
    const customer = await createCustomer(req.session.accessToken!, req.body);
    res.json(customer);
  } catch (error) {
    next(error);
  }
};
