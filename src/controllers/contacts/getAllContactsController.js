import { getAllContacts } from '../../services/contacts/getAllContacts.js';
import { parseFilterParams } from '../../utils/parseFilterParams.js';
import { parsePaginationParams } from '../../utils/parsePaginationParams.js';
import { parseSortParams } from '../../utils/parseSortParams.js';

export const getAllContactsController = async (req, res) => {
  const { page, perPage } = parsePaginationParams(req.query);
  const { sortBy, sortOrder } = parseSortParams(req.query);
  const filter = parseFilterParams(req.query);
  const { _id: userId } = req.user;

  const contacts = await getAllContacts({
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
