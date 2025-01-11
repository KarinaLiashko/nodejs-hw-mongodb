import { Router } from 'express';
import * as contactsControllers from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';
import { isValidId } from '../middlewares/isValidId.js';
import validateBody from '../middlewares/validateBody.js';
import {
  contactAddSchema,
  contactUpdateSchema,
} from '../validation/contacts.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsControllers.getContactsController));
contactsRouter.get(
  '/:_id',
  isValidId,
  ctrlWrapper(contactsControllers.getContactByIdController),
);

contactsRouter.post(
  '/',
  validateBody(contactAddSchema),
  ctrlWrapper(contactsControllers.addContactController),
);

contactsRouter.put(
  '/:id',
  isValidId,
  validateBody(contactAddSchema),
  ctrlWrapper(contactsControllers.upsertContactController),
);

contactsRouter.patch(
  '/:_id',
  isValidId,
  validateBody(contactUpdateSchema),
  ctrlWrapper(contactsControllers.patchContactController),
);

contactsRouter.delete(
  '/:_id',
  isValidId,
  ctrlWrapper(contactsControllers.deleteContactController),
);

export default contactsRouter;
