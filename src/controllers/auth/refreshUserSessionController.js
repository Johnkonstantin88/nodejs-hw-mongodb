import { refreshUser } from '../../services/auth/refreshUser.js';
import { setupSession } from '../../utils/userSessionOptions.js';

export const refreshUserSessionController = async (req, res) => {
  const session = await refreshUser({
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
