import { NextFunction, Request, Response } from 'express';
import {
  createNewModule,
  createRelationship,
  getFilteredAccounts,
  getFilteredContacts,
  getTokens,
  updateModule,
} from '@v1/services/suiteRequests';
import { writeFile } from 'fs/promises';
import path from 'path';

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
        },
      },
    };

    let contact;
    let account;

    const { data: existingA } = await getFilteredAccounts(access_token, customer.full_name, customer.email);
    const { data: existingC } = await getFilteredContacts(access_token, customer.phone, customer.email);

    // Check if Contact exists
    if (existingC.length > 0) {
      const newVal = { ...contactData, data: { ...contactData.data, id: existingC[0].id } };
      const { data: uContact } = await updateModule(access_token, newVal);
      contact = uContact;
    }
    const { data: nContact } = await createNewModule(access_token, contactData);
    contact = nContact;

    const relData = {
      data: {
        type: 'Contacts',
        id: contact.id,
      },
    };

    // Check if Account exists
    if (existingA.length > 0) {
      const newVal = { ...accountData, data: { ...accountData.data, id: existingA[0].id } };
      const { data: uAccount } = await updateModule(access_token, newVal);
      account = uAccount;
    }
    const { data: nAccount } = await createNewModule(access_token, accountData);
    account = nAccount;

    await createRelationship(access_token, account.type, account.id, relData);
    writeFile(path.join(process.cwd(), 'powerapi.log'), `${JSON.stringify(account)}\n`);
    return res.status(201).json(account);
  } catch (error) {
    return next(error);
  }
};
