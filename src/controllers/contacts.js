//import ContactCollection from '../db/models/Contacts.js';
//import * as contactServices from '../services/contacts.js';
import {
  getContacts,
  getContactById,
  addContact,
  deleteContact,
} from '../services/contacts.js';
import createHttpError from 'http-errors';
import mongoose from 'mongoose';
import ContactCollection from '../db/models/Contacts.js';

import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
//import { sortByList } from '../db/models/Contacts.js';
//import { parseFilterParams } from '../utils/parseContactFilterParams.js';

export const getContactsController = async (req, res, next) => {
  try {
    const { page, perPage } = parsePaginationParams(req.query);
    const { sortBy, sortOrder } = parseSortParams(req.query);

    //const filter = parseFilterParams(req.query);

    const data = await getContacts({
      page,
      perPage,
      sortBy,
      sortOrder,
    });

    res.json({
      status: 200,
      message: `Contact successfully found`,
      data,
    });
  } catch (error) {
    next(error);
  }
};

export const getContactByIdController = async (req, res) => {
  const { _id } = req.params;
  // const data = await contactServices.getContactById(id);

  if (!mongoose.Types.ObjectId.isValid(_id)) {
    throw createHttpError(404, 'Contact not found');
  }

  const data = await getContactById(_id);

  if (!data) {
    throw createHttpError(404, 'Contact not found');
  }

  res.json({
    status: 200,
    message: `Contact successfully found`,
    data,
  });
};

export const addContactController = async (req, res) => {
  const contact = await addContact(req.body);

  res.status(201).json({
    status: 201,
    message: 'Contact successfully added',
    data: contact,
  });
};

export const upsertContactController = async (
  contactId,
  payload,
  options = {},
) => {
  const updatedContact = await ContactCollection.findByIdAndUpdate(
    contactId,
    payload,
    {
      new: true,
      upsert: options.upsert || false,
      runValidators: true,
    },
  );

  if (!updatedContact) return null;

  return {
    contact: updatedContact,
    isNew: options.upsert || false,
  };
};

export const patchContactController = async (req, res, next) => {
  try {
    const { _id } = req.params;

    const result = await upsertContactController(_id, req.body);

    if (!result) {
      return next(createHttpError(404, 'Contact not found!'));
    }

    res.status(200).json({
      message: 'Contact patched successfully',
      data: result.contact,
    });
  } catch (error) {
    next(error);
  }
};

export const deleteContactController = async (req, res, next) => {
  const { _id } = req.params;

  const data = await deleteContact(_id);

  if (!data) {
    next(createHttpError(404, 'Contact not found!'));
    return;
  }

  res.status(204).send();
};
