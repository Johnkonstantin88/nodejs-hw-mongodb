import { ctrlWrapper } from '../../utils/ctrlWrapper.js';
import { loginUserController } from './loginUserController.js';
import { logoutUserController } from './logoutUserController.js';
import { refreshUserSessionController } from './refreshUserSessionController.js';
import { registerUserController } from './registerUserController.js';
import { resetPasswordController } from './resetPasswordController.js';
import { sendResetEmailController } from './sendResetEmailController.js';
import { getGoogleOAuthUrlController } from './getGoogleOAuthUrlController.js';
import { loginWithGoogleController } from './loginWithGoogleController.js';

const ctrl = {
  registerUserController: ctrlWrapper(registerUserController),
  loginUserController: ctrlWrapper(loginUserController),
  refreshUserSessionController: ctrlWrapper(refreshUserSessionController),
  logoutUserController: ctrlWrapper(logoutUserController),
  sendResetEmailController: ctrlWrapper(sendResetEmailController),
  resetPasswordController: ctrlWrapper(resetPasswordController),
  getGoogleOAuthUrlController: ctrlWrapper(getGoogleOAuthUrlController),
  loginWithGoogleController: ctrlWrapper(loginWithGoogleController),
};

export default ctrl;
