import { Contact } from '../db/models/contact.js';

const getAllContacts = async () => {
  const result = await Contact.find({}, '-createdAt -updatedAt');
  return result;
};

const getContactById = async (contactId) => {
  const result = await Contact.findById(contactId, '-createdAt -updatedAt');
  return result;
};

const createContact = async (payload) => {
  const result = await Contact.create(payload);
  return result;
};

const updateContact = async (contactId, payload, options = {}) => {
  const result = await Contact.findOneAndUpdate({ _id: contactId }, payload, {
    new: true,
    includeResultMetadata: true,
    ...options,
  });

  if (!result || !result.value) return null;

  return {
    contact: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};

const deleteContact = async (contactId) => {
  const result = await Contact.findOneAndDelete({ _id: contactId });

  return result;
};

const contactsServices = {
  getAllContacts,
  getContactById,
  createContact,
  updateContact,
  deleteContact,
};

export default contactsServices;
