import { sendResetEmail } from '../../services/auth/sendResetEmail.js';

export const sendResetEmailController = async (req, res) => {
  await sendResetEmail(req.body.email);

  res.json({
    status: 200,
    message: 'Reset password email has been successfully sent.',
    data: {},
  });
};
