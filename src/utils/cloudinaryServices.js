import { v2 as cloudinary } from 'cloudinary';
import fs from 'node:fs/promises';

import { getEnvVar } from './getEnvVar.js';
import { CLOUDINARY } from '../constants/index.js';

cloudinary.config({
  secure: true,
  cloud_name: getEnvVar(CLOUDINARY.CLOUD_NAME),
  api_key: getEnvVar(CLOUDINARY.CLOUD_API_KEY),
  api_secret: getEnvVar(CLOUDINARY.CLOUD_API_SECRET),
});

export const saveFileToCloudinary = async (file) => {
  const response = await cloudinary.uploader.upload(file.path);
  await fs.unlink(file.path);
  return response;
};

export const deleteFileFromCloudinary = async (id) => {
  const response = await cloudinary.uploader.destroy(id);
  return response;
};
