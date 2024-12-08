import * as authServices from '../services/auth.js';
import { ctrlWrapper } from '../utils/ctrlWrapper.js';
import { setupSession } from '../utils/userSessionOptions.js';

const registerUserController = async (req, res) => {
  const user = await authServices.registerUser(req.body);

  res.status(201).json({
    status: 201,
    message: 'Successfully registered a user!',
    data: user,
  });
};

const loginUserController = async (req, res) => {
  const session = await authServices.loginUser(req.body);

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in an user!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

const refreshUserSessionController = async (req, res) => {
  const session = await authServices.refreshUser({
    sessionId: req.cookies.sessionId,
    refreshToken: req.cookies.refreshToken,
  });

  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully refreshed a session!',
    data: {
      accessToken: session.accessToken,
    },
  });
};

const logoutUserController = async (req, res) => {
  if (req.cookies.sessionId) {
    await authServices.logoutUser(req.cookies.sessionId);
  }

  res.clearCookie('sessionId');
  res.clearCookie('refreshToken');

  res.status(204).send();
};

const ctrl = {
  registerUserController: ctrlWrapper(registerUserController),
  loginUserController: ctrlWrapper(loginUserController),
  refreshUserSessionController: ctrlWrapper(refreshUserSessionController),
  logoutUserController: ctrlWrapper(logoutUserController),
};

export default ctrl;
