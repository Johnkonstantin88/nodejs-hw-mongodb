import { Contact } from '../../db/models/contact.js';
import { getEnvVar } from '../../utils/getEnvVar.js';
import { deleteFileFromCloudinary } from '../../utils/cloudinaryServices.js';
import { deleteFileFromUploadDir } from '../../utils/uploadDirServices.js';

export const deleteContact = async ({ contactId, userId }) => {
  const { photo, photoPublicId } = await Contact.findOne({
    _id: contactId,
    userId,
  });
  const result = await Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });

  if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
    if (photoPublicId) await deleteFileFromCloudinary(photoPublicId);
  } else {
    if (photo) await deleteFileFromUploadDir(photo);
  }

  return result;
};
