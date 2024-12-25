import { Contact } from '../../db/models/contact.js';
import { getEnvVar } from '../../utils/getEnvVar.js';
import { deleteFileFromCloudinary } from '../../utils/cloudinaryServices.js';
import { deleteFileFromUploadDir } from '../../utils/uploadDirServices.js';

export const deleteContact = async ({ contactId, userId }) => {
  const contact = await Contact.findOne({
    _id: contactId,
    userId,
  });

  if (!contact) return;

  const result = await Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });

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

  return result;
};
