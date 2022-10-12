import { NextFunction, Request, Response } from 'express';
import { getToken } from '$v1/requests/svenn/accessToken';
import { createClient } from '$v1/requests/svenn/clients';
import { createProject } from '$v1/requests/svenn/projects';
import { createTask } from '$v1/requests/svenn/tasks';
import { createWork } from '$v1/requests/svenn/works';

export const latepointToSvenn = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const startDateTime = req.body.start_datetime.split('T');
    const endDateTime = req.body.end_datetime.split('T');
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
      start_date: startDateTime[0],
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

    const { data: task } = await createTask(access_token, taskData);

    const workData = {
      from_date: startDateTime[0],
      to_date: endDateTime[0],
      from_time: startDateTime[1].substring(0, 8),
      duration: 3600,
      lunch_duration: 0,
      user_ids: 20707,
      note: custom_fields.cf_nSrCbfGj,
      task_id: task.id,
      project_id: project.id,
      client_id: client.id,
    };

    const work = await createWork(access_token, workData);

    return res.status(201).json(work);
  } catch (error) {
    return next(error);
  }
};
