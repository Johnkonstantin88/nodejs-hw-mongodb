import { loginOrSignupWithGoogle } from '../../services/auth/loginOrSignupWithGoogle.js';
import { setupSession } from '../../utils/userSessionOptions.js';

export const loginWithGoogleController = async (req, res) => {
  const session = await loginOrSignupWithGoogle(req.body.code);
  setupSession(res, session);

  res.json({
    status: 200,
    message: 'Successfully logged in via Google OAuth!',
    data: {
      accessToken: session.accessToken,
    },
  });
};
