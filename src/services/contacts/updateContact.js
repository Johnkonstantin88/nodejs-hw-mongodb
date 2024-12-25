import { Contact } from '../../db/models/contact.js';
import { getEnvVar } from '../../utils/getEnvVar.js';
import { deleteFileFromCloudinary } from '../../utils/cloudinaryServices.js';
import { deleteFileFromUploadDir } from '../../utils/uploadDirServices.js';

export const updateContact = async (
  contactId,
  userId,
  payload,
  options = {},
) => {
  const contact = await Contact.findOne({
    _id: contactId,
    userId,
  });

  if (!contact) return;

  const result = await Contact.findOneAndUpdate(
    { _id: contactId, userId },
    payload,
    {
      new: true,
      includeResultMetadata: true,
      ...options,
    },
  );

  if (contact && contact.photo !== null) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      const splittedUrl = contact.photo.split('/');
      const photoPublicId = splittedUrl[splittedUrl.length - 1].replace(
        '.jpg',
        '',
      );
      await deleteFileFromCloudinary(photoPublicId);
    } else {
      await deleteFileFromUploadDir(contact.photo);
    }
  }

  if (!result || !result.value) return null;

  return {
    contact: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};
