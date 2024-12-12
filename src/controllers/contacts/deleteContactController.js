import createHttpError from 'http-errors';
import { deleteContact } from '../../services/contacts/deleteContact.js';

export const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const result = await deleteContact({ contactId, userId });

  if (!result) throw createHttpError(404, 'Contact not found');

  res.status(204).send();
};
