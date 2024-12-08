import { Contact } from '../db/models/contact.js';
import { calculatePaginationData } from '../utils/calculatePaginationData.js';
import { SORT_ORDER } from '../constants/index.js';

export const getAllContacts = async ({
  userId,
  page,
  perPage,
  sortBy = '_id',
  sortOrder = SORT_ORDER.ASC,
  filter = {},
}) => {
  const limit = perPage;
  const skip = (page - 1) * perPage;

  const contactsQuery = Contact.find({ userId }, '-createdAt -updatedAt');

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

export const getContactById = async ({ contactId, userId }) => {
  const result = await Contact.findOne(
    { _id: contactId, userId },
    '-createdAt -updatedAt',
  );
  return result;
};

export const createContact = async (payload) => {
  const result = await Contact.create(payload);
  return result;
};

export const updateContact = async (
  contactId,
  userId,
  payload,
  options = {},
) => {
  const result = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (!result || !result.value) return null;

  return {
    contact: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};

export const deleteContact = async ({ contactId, userId }) => {
  const result = await Contact.findOneAndDelete({ _id: contactId, userId });

  return result;
};
