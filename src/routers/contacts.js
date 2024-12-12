import { Router } from 'express';
import ctrl from '../controllers/contacts/index.js';
import { isValidId } from '../middlewares/isValidId.js';
import { validateBody } from '../middlewares/validateBody.js';
import { authenticate } from '../middlewares/authenticate.js';
import { upload } from '../middlewares/multer.js';
import * as contactsSchemas from '../validation/contacts.js';

const router = Router();

router.use(authenticate);

router.get('/', ctrl.getAllContactsController);

router.get('/:contactId', isValidId, ctrl.getContactByIdController);

router.post(
  '/',
  upload.single('photo'),
  validateBody(contactsSchemas.createContactSchema),
  ctrl.createContactController,
);

router.patch(
  '/:contactId',
  isValidId,
  upload.single('photo'),
  validateBody(contactsSchemas.updateContactSchema),
  ctrl.updateContactController,
);

router.delete('/:contactId', isValidId, ctrl.deleteContactController);

export default router;
