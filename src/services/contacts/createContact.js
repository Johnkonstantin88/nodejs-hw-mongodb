import { Contact } from '../../db/models/contact.js';

export const createContact = async (payload) => {
  const result = await Contact.create(payload);
  return result;
};
