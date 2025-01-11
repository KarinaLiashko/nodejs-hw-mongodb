//import ContactCollection from '../db/models/Contacts.js';
import * as contactServices from '../services/contacts.js';
import createHttpError from 'http-errors';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseContactFilterParams.js';

export const getContactsController = async (req, res, next) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);

  const contacts = await contactServices.getContacts({
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.json({
    status: 200,
    message: `Contact successfully found`,
    data: contacts,
  });
};

export const getContactByIdController = async (req, res, next) => {
  const { id } = req.params;
  const data = await contactServices.getContactById(id);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Successfully found contact with id ${id}!`,
    data,
  });
};

export const addContactController = async (req, res, next) => {
  const data = await contactServices.addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Contacts successfullt added',
    data,
  });
};

export const upsertContactController = async (req, res) => {
  const { id: _id } = req.params;

  const result = await contactServices.updateContact({
    _id,
    payload: req.body,
    options: { upsert: true },
  });

  const status = result.isNew ? 201 : 200;

  res.status(status).json({
    status,
    message: 'Contact update successfull',
    data: result,
  });
};

export const patchContactController = async (req, res) => {
  const { id: _id } = req.params;

  const result = await contactServices.updateContact({
    _id,
    payload: req.body,
  });

  if (!result) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.data,
  });
};

export const deleteContactController = async (req, res) => {
  const { id: _id } = req.params;

  const data = await contactServices.deleteContact({ _id });

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(204).json({
    status: 204,
  });
};
