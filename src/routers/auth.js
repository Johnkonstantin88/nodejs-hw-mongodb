import { Router } from 'express';
import { validateBody } from '../middlewares/validateBody.js';
import * as authSchemas from '../validation/auth.js';
import ctrl from '../controllers/auth.js';

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

export default router;
