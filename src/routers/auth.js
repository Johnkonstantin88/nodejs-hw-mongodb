import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import * as authSchemas from '../validation/auth.js';
import ctrl from '../controllers/auth/index.js';

const router = Router();

router.post(
  '/register',
  validateBody(authSchemas.registerUserSchema),
  ctrl.registerUserController,
);

router.post(
  '/login',
  validateBody(authSchemas.loginUserSchema),
  ctrl.loginUserController,
);

router.post('/refresh', ctrl.refreshUserSessionController);

router.post('/logout', ctrl.logoutUserController);

router.post(
  '/send-reset-email',
  validateBody(authSchemas.sendResetEmailSchema),
  ctrl.sendResetEmailController,
);

router.post(
  '/reset-pwd',
  validateBody(authSchemas.resetPasswordSchema),
  ctrl.resetPasswordController,
);

router.get('/get-oauth-url', ctrl.getGoogleOAuthUrlController);

router.post(
  '/confirm-oauth',
  validateBody(authSchemas.loginWithGoogleOAuthSchema),
  ctrl.loginWithGoogleController,
);

export default router;
