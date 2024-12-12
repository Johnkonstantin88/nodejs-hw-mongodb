import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../../db/models/user.js';

export const registerUser = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({ email });
  if (user) throw createHttpError(409, 'Email in use');

  const encryptedPassword = await bcrypt.hash(password, 10);
  return await User.create({
    ...payload,
    password: encryptedPassword,
  });
};
