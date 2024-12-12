import path from 'node:path';
import fs from 'node:fs/promises';
import { getEnvVar } from './getEnvVar.js';
import { TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constants/index.js';

export const saveFileToUploadDir = async (file) => {
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );

  return `${getEnvVar('APP_DOMAIN')}/uploads/${file.filename}`;
};

export const deleteFileFromUploadDir = async (photoUrl) => {
  const splittedUrl = photoUrl.split('/');
  const fileName = splittedUrl[splittedUrl.length - 1];
  const filePath = path.join(UPLOAD_DIR, fileName);

  try {
    await fs.unlink(filePath);
  } catch (error) {
    if (error.code === 'ENOENT')
      return { response: 'File not found in upload directory' };
  }

  return { response: 'ok' };
};
