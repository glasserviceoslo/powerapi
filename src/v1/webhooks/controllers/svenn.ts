import { NextFunction, Request, Response } from 'express';
import { getToken } from '$v1/requests/svenn/accessToken';
import { createClient } from '$v1/requests/svenn/clients';
import { createProject } from '$v1/requests/svenn/projects';
import { createTask } from '$v1/requests/svenn/tasks';

export const latepointToSvenn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { customer } = req.body;
    const { custom_fields } = customer;
    const {
      data: { access_token },
    } = await getToken();

    const clientData = {
      name: customer.full_name,
      contact_person: customer.full_name,
      email: customer.email,
      phone: customer.phone,
      billing_address: {
        country: 'NO',
        type: 'billing',
        street: custom_fields.cf_ikbgaUAm,
        city: custom_fields.cf_a1uMDl3x,
        state: null,
        zip: custom_fields.cf_S7vs1QMZ,
      },
      shipping_address: {
        country: 'NO',
        type: 'shipping',
        street: custom_fields.cf_ikbgaUAm,
        city: custom_fields.cf_a1uMDl3x,
        state: null,
        zip: custom_fields.cf_S7vs1QMZ,
      },
    };

    const { data: client } = await createClient(access_token, clientData);

    const projectData = {
      user_id: 20706,
      name: custom_fields.cf_ikbgaUAm,
      project_address: `${custom_fields.cf_ikbgaUAm}, ${custom_fields.cf_a1uMDl3x}, Norge`,
      start_date: req.body.start_datetime.split('T')[0],
      client_id: client.id,
      description: custom_fields.cf_nSrCbfGj,
    };

    const { data: project } = await createProject(access_token, projectData);

    const taskData = {
      user_id: 20706,
      name: 'Befaring',
      project_id: project.id,
      account_id: 7716,
      type: 'general',
      deleted: 0,
      total_minutes: 60,
    };

    const task = await createTask(access_token, taskData);

    return res.status(201).json(task);
  } catch (error) {
    return next(error);
  }
};
