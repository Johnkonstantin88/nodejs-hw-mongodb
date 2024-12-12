import createHttpError from 'http-errors';
import { updateContact } from '../../services/contacts/updateContact.js';
import { saveFileToCloudinary } from '../../utils/cloudinaryServices.js';
import { saveFileToUploadDir } from '../../utils/uploadDirServices.js';
import { getEnvVar } from '../../utils/getEnvVar.js';

export const updateContactController = async (req, res) => {
  const { contactId } = req.params;
  const { _id: userId } = req.user;
  const file = req.file;

  let photoUrl;
  let photoId;

  if (file) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      const photo = await saveFileToCloudinary(file);
      photoUrl = photo.secure_url;
      photoId = photo.public_id;
    } else {
      photoUrl = await saveFileToUploadDir(file);
      photoId = null;
    }
  }

  const result = await updateContact(contactId, userId, {
    ...req.body,
    photo: photoUrl,
    photoPublicId: photoId,
  });

  if (!result) throw createHttpError(404, 'Contact not found');

  res.status(200).json({
    status: 200,
    message: 'Successfully patched a contact!',
    data: result.contact,
  });
};
