import * as contactServices from '../services/contacts.js';

import createHttpError from 'http-errors';

export const getContactsController = async (req, res) => {
  const data = await contactServices.getContacts();

  res.json({
    status: 200,
    message: `Contact successfully found`,
    data,
  });
};

export const getContacByIdController = async (req, res) => {
  const { id } = req.params;
  const data = await contactServices.getContactById(id);

  if (!data) {
    throw createHttpError(404, `Contact with id=${id} not found`);
  }

  res.json({
    status: 200,
    message: `Contact successfully found`,
    data,
  });
};

export const addContactController = async (rec, res) => {
  console.log(req.body);
};
