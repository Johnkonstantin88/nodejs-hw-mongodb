import { Router } from 'express';
import ctrl from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import * as contactsSchemas from '../validation/contacts.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrl.getAllContactsController);

router.get('/:contactId', isValidId, ctrl.getContactByIdController);

router.post(
  '/',
  validateBody(contactsSchemas.createContactSchema),
  ctrl.createContactController,
);

router.patch(
  '/:contactId',
  isValidId,
  validateBody(contactsSchemas.updateContactSchema),
  ctrl.updateContactController,
);

router.delete('/:contactId', isValidId, ctrl.deleteContactController);

export default router;
