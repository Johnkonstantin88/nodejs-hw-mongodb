import { Contact } from '../db/models/contact.js';

export const getAllContacts = async () => {
  const result = await Contact.find({}, '-createdAt -updatedAt');
  return result;
};

export const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId, '-createdAt -updatedAt');
  return result;
};
