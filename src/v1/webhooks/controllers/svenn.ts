import { NextFunction, Request, Response } from 'express';
import { getToken } from '$v1/requests/svenn/accessToken';
import { createClient } from '$v1/requests/svenn/clients';
import { createProject } from '$v1/requests/svenn/projects';

export const latepointToSvenn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customer } = req.body;
    const {
      data: { access_token },
    } = await getToken();

    const clientData = {
      name: customer.full_name,
      contact_person: customer.full_name,
      email: customer.email,
      phone: customer.phone,
    };

    const client = await createClient(access_token, clientData);

    const projectData = {
      user_id: 20706,
      name: customer.custom_fields.cf_ikbgaUAm,
      address: `${customer.custom_fields.cf_ikbgaUAm}, ${customer.custom_fields.cf_a1uMDl3x}, Norge`,
      start_date: req.body.start_datetime.split('T')[0],
      client_id: client.id,
      description: customer.custom_fields.cf_nSrCbfGj,
    };

    const project = await createProject(access_token, projectData);

    return res.status(201).json(project);
  } catch (error) {
    return next(error);
  }
};
