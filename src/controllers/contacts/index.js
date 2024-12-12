import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { createContactController } from './createContactController.js';
import { deleteContactController } from './deleteContactController.js';
import { getAllContactsController } from './getAllContactsController.js';
import { getContactByIdController } from './getContactByIdController.js';
import { updateContactController } from './updateContactController.js';

const ctrl = {
  getAllContactsController: ctrlWrapper(getAllContactsController),
  getContactByIdController: ctrlWrapper(getContactByIdController),
  createContactController: ctrlWrapper(createContactController),
  updateContactController: ctrlWrapper(updateContactController),
  deleteContactController: ctrlWrapper(deleteContactController),
};

export default ctrl;
