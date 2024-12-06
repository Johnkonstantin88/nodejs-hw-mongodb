import { Router } from 'express';
import ctrl from '../controllers/contacts.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import schemas from '../validation/contacts.js';

const router = Router();

router.get('/contacts', ctrl.getAllContactsController);

router.get('/contacts/:contactId', isValidId, ctrl.getContactByIdController);

router.post(
  '/contacts',
  validateBody(schemas.createContactSchema),
  ctrl.createContactController,
);

router.patch(
  '/contacts/:contactId',
  isValidId,
  validateBody(schemas.updateContactSchema),
  ctrl.updateContactController,
);

router.delete('/contacts/:contactId', isValidId, ctrl.deleteContactController);

export default router;
