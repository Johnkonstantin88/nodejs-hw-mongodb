import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../../db/models/user.js';
import { Session } from '../../db/models/session.js';
import { createSession } from '../../utils/userSessionOptions.js';

export const loginUser = async (payload) => {
  const { email, password } = payload;
  const user = await User.findOne({ email });

  if (!user) {
    throw createHttpError(401, 'Wrong email or password');
  }

  const comparedPassword = await bcrypt.compare(password, user.password);

  if (!comparedPassword) {
    throw createHttpError(401, 'Wrong email or password');
  }

  await Session.deleteOne({ userId: user._id });

  const newSession = createSession();

  return await Session.create({
    userId: user._id,
    ...newSession,
  });
};
