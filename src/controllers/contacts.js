import createHttpError from 'http-errors';
import * as contactsServices from '../services/contacts.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { parsePaginationParams } from '../utils/parsePaginationParams.js';
import { parseSortParams } from '../utils/parseSortParams.js';
import { parseFilterParams } from '../utils/parseFilterParams.js';

const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const { _id: userId } = req.user;

  const contacts = await contactsServices.getAllContacts({
    userId,
    page,
    perPage,
    sortBy,
    sortOrder,
    filter,
  });

  res.status(200).json({
    status: 200,
    message: 'Successfully found contacts!',
    data: contacts,
  });
};

const getContactByIdController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const contact = await contactsServices.getContactById({ contactId, userId });

  if (!contact) {
    throw createHttpError(404, 'Contact not found');
  }

  res.status(200).json({
    status: 200,
    message: `Successfully found contact with id ${contactId}!`,
    data: contact,
  });
};

const createContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const contact = await contactsServices.createContact({ ...req.body, userId });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};

const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const result = await contactsServices.updateContact(
    contactId,
    userId,
    req.body,
  );

  if (!result) throw createHttpError(404, 'Contact not found');

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};

const deleteContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const result = await contactsServices.deleteContact({ contactId, userId });

  if (!result) throw createHttpError(404, 'Contact not found');

  res.status(204).send();
};

const ctrl = {
  getAllContactsController: ctrlWrapper(getAllContactsController),
  getContactByIdController: ctrlWrapper(getContactByIdController),
  createContactController: ctrlWrapper(createContactController),
  updateContactController: ctrlWrapper(updateContactController),
  deleteContactController: ctrlWrapper(deleteContactController),
};

export default ctrl;
