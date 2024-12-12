import { Contact } from '../../db/models/contact.js';

export const getContactById = async ({ contactId, userId }) => {
  const result = await Contact.findOne(
    { _id: contactId, userId },
    '-createdAt -updatedAt',
  );
  return result;
};
