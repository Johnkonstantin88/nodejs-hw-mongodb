import createHttpError from 'http-errors';
import bcrypt from 'bcrypt';
import { randomBytes } from 'crypto';
import { User } from '../../db/models/user.js';
import { Session } from '../../db/models/session.js';
import { createSession } from '../../utils/userSessionOptions.js';

import {
  getFullNameFromGoogleTokenPayload,
  validateCode,
} from '../../utils/googleOAuth2.js';

export const loginOrSignupWithGoogle = async (code) => {
  const loginTicket = await validateCode(code);
  const payload = loginTicket.getPayload();

  if (!payload) throw createHttpError(401);

  let user = await User.findOne({ email: payload.email });

  if (!user) {
    const password = await bcrypt.hash(randomBytes(10), 10);
    user = await User.create({
      email: payload.email,
      name: getFullNameFromGoogleTokenPayload(payload),
      password,
    });
  }

  const newSession = createSession();

  return await Session.create({
    userId: user._id,
    ...newSession,
  });
};
