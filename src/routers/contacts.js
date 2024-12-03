import { Router } from 'express';
import ctrl from '../controllers/contacts.js';

const router = Router();

router.get('/contacts', ctrl.getAllContactsController);

router.get('/contacts/:contactId', ctrl.getContactByIdController);

router.post('/contacts', ctrl.createContactController);

router.patch('/contacts/:contactId', ctrl.updateContactController);

router.delete('/contacts/:contactId', ctrl.deleteContactController);

export default router;
