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
  const { photo, photoPublicId } = await Contact.findOne({
    _id: contactId,
    userId,
  });
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

  if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
    if (photoPublicId) await deleteFileFromCloudinary(photoPublicId);
  } else {
    if (photo) await deleteFileFromUploadDir(photo);
  }

  return {
    contact: result.value,
    isNew: Boolean(result?.lastErrorObject?.upserted),
  };
};
