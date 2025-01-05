import ContactCollection from '../db/models/Contacts.js';

import { calculatePaginationData } from '../utils/calculatePaginationData.js';

import { SORT_ORDER } from '../constants/index.js';

export const getContacts = async ({
  page = 1,
  perPage = 10,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  // filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = ContactCollection.find();

  //if (filter.isFavourite) {
  //  contactsQuery.where('isFavourite').equals(filter.isFavourite);
  //}

  const contactsCount = await ContactCollection.find()
    .merge(contactsQuery)
    .countDocuments();

  const contacts = await contactsQuery
    .skip(skip)
    .limit(limit)
    .sort({ [sortBy]: sortOrder })
    .exec();

  const paginationData = calculatePaginationData({
    contactsCount,
    perPage,
    page,
  });

  return {
    data: contacts,
    ...paginationData,
  };
};

export const getContactById = (id) => ContactCollection.findById(id);

export const addContact = async (payload) => {
  const contact = await ContactCollection.create(payload);
  return contact;
};

export const deleteContact = async (_id) => {
  const contact = await ContactCollection.findOneAndDelete({ _id: _id });
  return contact;
};

//export const updateContact = async ({ _id, payload, options = {} }) => {
// const rawResult = await ContactCollection.findOneAndUpdate({ _id }, payload, {
//   ...options,
//   new: true,
//   includeResultMetadata: true,
// });

// if (!rawResult || !rawResult.value) return null;

// return {
//   data: rawResult.value,
//   isNew: Boolean(rawResult.lastErrorObject.upserted),
// };
//};
