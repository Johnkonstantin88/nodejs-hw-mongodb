import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

const getAllContacts = async ({
  page,
  perPage,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find({}, '-createdAt -updatedAt');

  if (filter.isFavourite) {
    contactsQuery.where(`isFavourite`).equals(filter.isFavourite);
  }

  if (filter.contactType) {
    contactsQuery.where('contactType').equals(filter.contactType);
  }

  const [contactsCount, contacts] = await Promise.all([
    Contact.find().merge(contactsQuery).countDocuments(),
    contactsQuery
      .limit(limit)
      .skip(skip)
      .sort({ [sortBy]: sortOrder })
      .exec(),
  ]);

  const paginationData = calculatePaginationData(contactsCount, perPage, page);

  return {
    data: contacts,
    ...paginationData,
  };
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
