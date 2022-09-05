import { NextFunction, Request, Response } from 'express';
import { createNewModule, getFilteredCollection, getTokens, updateModule } from '@v1/services/suiteRequests';

export const moduleFromHook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customer } = req.body;
    const { custom_fields } = customer;
    const { access_token } = await getTokens();

    const accountData = {
      data: {
        type: 'Accounts',
        attributes: {
          name: customer.full_name,
          email1: customer.email,
          phone_office: customer.phone,
          phone_fax: custom_fields.cf_hOOzZCcn,
          description: custom_fields.cf_nSrCbfGj,
          billing_address_street: custom_fields.cf_ikbgaUAm,
          billing_address_city: custom_fields.cf_a1uMDl3x,
          billing_address_postalcode: custom_fields.cf_S7vs1QMZ,
          billing_address_country: 'NORGE',
        },
      },
    };

    const { data: existing } = await getFilteredCollection(access_token, customer.full_name, customer.email);
    if (existing.length > 0) {
      const newVal = { ...accountData, data: { ...accountData.data, id: existing.id } };
      const updatedAccount = await updateModule(access_token, newVal);
      return res.status(201).json(updatedAccount);
    }
    const account = await createNewModule(access_token, accountData);
    return res.status(201).json(account);
  } catch (error) {
    return next(error);
  }
};
