import { Router } from 'express';

import {
  deleteContactController,
  getContactByIdController,
  getContactsController,
  patchContactController,
  addContactController,
} from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(getContactsController));
contactsRouter.get('/:_id', isValidId, ctrlWrapper(getContactByIdController));

contactsRouter.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(addContactController),
);

//contactsRouter.put(
// '/contacts/:_id',
//  isValidId,
//  validateBody(contactAddSchema),
//  ctrlWrapper(upsertContactController),
//);

contactsRouter.patch(
  '/:_id',
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(patchContactController),
);

contactsRouter.delete('/:_id', isValidId, ctrlWrapper(deleteContactController));

export default contactsRouter;
