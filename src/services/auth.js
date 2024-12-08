import bcrypt from 'bcrypt';
import createHttpError from 'http-errors';
import { User } from '../db/models/user.js';
import { Session } from '../db/models/session.js';
import { createSession } from '../utils/userSessionOptions.js';

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

export const refreshUser = async ({ sessionId, refreshToken }) => {
  const session = await Session.findOne({ _id: sessionId, refreshToken });

  if (!session) {
    throw createHttpError(401, 'Session not found');
  }

  const isSessionTokenExpired =
    new Date() > new Date(session.refreshTokenValidUntil);

  if (isSessionTokenExpired) {
    throw createHttpError(401, 'Session token expired');
  }

  const newSession = createSession();

  await Session.deleteOne({ _id: sessionId, refreshToken });

  return await Session.create({
    userId: session.userId,
    ...newSession,
  });
};

export const logoutUser = async (sessionId) => {
  await Session.deleteOne({ _id: sessionId });
};
