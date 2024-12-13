import { Contact } from '../../db/models/contact.js';
import { getEnvVar } from '../../utils/getEnvVar.js';
import { deleteFileFromCloudinary } from '../../utils/cloudinaryServices.js';
import { deleteFileFromUploadDir } from '../../utils/uploadDirServices.js';

export const deleteContact = async ({ contactId, userId }) => {
  const { photo } = await Contact.findOne({
    _id: contactId,
    userId,
  });
  const result = await Contact.findOneAndDelete({
    _id: contactId,
    userId,
  });

  if (photo) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      const splittedUrl = photo.split('/');
      const photoPublicId = splittedUrl[splittedUrl.length - 1].replace(
        '.jpg',
        '',
      );
      await deleteFileFromCloudinary(photoPublicId);
    }
  } else {
    await deleteFileFromUploadDir(photo);
  }

  return result;
};
