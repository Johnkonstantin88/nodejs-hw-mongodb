import { createContact } from '../../services/contacts/createContact.js';
import { saveFileToCloudinary } from '../../utils/cloudinaryServices.js';
import { saveFileToUploadDir } from '../../utils/uploadDirServices.js';
import { getEnvVar } from '../../utils/getEnvVar.js';

export const createContactController = async (req, res) => {
  const { _id: userId } = req.user;
  const file = req.file;

  let photoUrl;

  if (file) {
    if (getEnvVar('ENABLE_CLOUDINARY') === 'true') {
      const photo = await saveFileToCloudinary(file);
      photoUrl = photo.secure_url;
    } else {
      photoUrl = await saveFileToUploadDir(file);
    }
  }

  const contact = await createContact({
    ...req.body,
    userId,
    photo: photoUrl,
  });

  res.status(201).json({
    status: 201,
    message: 'Successfully created a contact!',
    data: contact,
  });
};
