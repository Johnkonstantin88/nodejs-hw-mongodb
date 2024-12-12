import multer from 'multer';
import path from 'node:path';
import crypto from 'node:crypto';
import { TEMP_UPLOAD_DIR } from '../constants/index.js';

const multerConfig = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, TEMP_UPLOAD_DIR);
  },
  filename: function (req, file, cb) {
    const extname = path.extname(file.originalname);
    const basename = path.basename(file.originalname, extname);
    const id = crypto.randomUUID();
    cb(null, `${basename}-${id}${extname}`);
  },
});

export const upload = multer({
  storage: multerConfig,
});
