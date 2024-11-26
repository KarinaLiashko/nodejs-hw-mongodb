import { Router } from 'express';

import * as contactsControllers from '../controllers/contacts.js';
import ctrlWrapper from '../utils/ctrlWrapper.js';

const contactsRouter = Router();

contactsRouter.get('/', ctrlWrapper(contactsControllers.getContactsController));

contactsRouter.get(
  '/:id',
  ctrlWrapper(contactsControllers.getContacByIdController),
);

contactsRouter.post('/', ctrlWrapper(contactsControllers.addContactController));

export default contactsRouter;
