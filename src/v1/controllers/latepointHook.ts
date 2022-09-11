import { NextFunction, Request, Response } from 'express';
import { createNewModule, getFilteredAccounts, getTokens, updateModule } from '@v1/services/suiteRequests';

export const moduleFromHook = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customer } = req.body;
    const { custom_fields } = customer;
    const { access_token } = await getTokens();

    const firstName = customer.full_name.split(' ').slice(0, -1).join(' ');
    const lastName = customer.full_name.split(' ').slice(-1).join(' ');

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

    const contactData = {
      data: {
        type: 'Contacts',
        attributes: {
          name: customer.full_name,
          created_by: '3986b4ab-5ed1-0a0c-5493-610cf58154c3',
          created_by_name: 'Glass-Service Svendsen og Sønn AS',
          deleted: '0',
          assigned_user_id: '3986b4ab-5ed1-0a0c-5493-610cf58154c3',
          assigned_user_name: 'Glass-Service Svendsen og Sønn AS',
          first_name: firstName,
          last_name: lastName,
          full_name: customer.full_name,
          phone_mobile: customer.phone,
          phone_work: customer.phone,
          email1: customer.email,
          primary_address_street: custom_fields.cf_ikbgaUAm,
          primary_address_city: custom_fields.cf_a1uMDl3x,
          primary_address_postalcode: custom_fields.cf_S7vs1QMZ,
          primary_address_country: 'NORGE',
          account_name: 'Jarle Knut Aase',
          account_id: '9787a651-bef4-be8c-e079-63034b0985a8',
        },
      },
    };

    const { data: existing } = await getFilteredAccounts(access_token, customer.full_name, customer.email);
    if (existing.length > 0) {
      const newVal = { ...accountData, data: { ...accountData.data, id: existing[0].id } };
      await updateModule(access_token, newVal);
      const updatedContact = {
        ...contactData,
        data: {
          ...contactData.data,
          account_name: existing[0].attributes.name,
          account_id: existing[0].id,
        },
      };
      const contact = await createNewModule(access_token, updatedContact);
      return res.status(201).json(contact);
    }
    const { data: account } = await createNewModule(access_token, accountData);
    const updatedContact = {
      ...contactData,
      data: {
        ...contactData.data,
        account_name: account.attributes.name,
        account_id: account.id,
      },
    };
    const contact = await createNewModule(access_token, updatedContact);
    return res.status(201).json(contact);
  } catch (error) {
    return next(error);
  }
};
