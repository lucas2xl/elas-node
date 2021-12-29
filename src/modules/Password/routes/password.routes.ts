import { Router } from 'express';
import { isAuthenticate } from '@shared/http/middlewares/isAuthenticate';
import { GenerateCodeController } from '../controller/GenerateCodeController';
import { RecoverPasswordController } from '../controller/RecoverPasswordController';
import { celebrate, Joi, Segments } from 'celebrate';
import { CheckCodeController } from '../controller/CheckCodeController';

const passwordRoutes = Router();
const generateCodeController = new GenerateCodeController();
const checkCodeController = new CheckCodeController();
const recoverPasswordController = new RecoverPasswordController();

const validateRequestBody = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
  },
});
const validateCheckCodeBody = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    code: Joi.string().required(),
  },
});

const validateRecoverBody = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    newPassword: Joi.string().required(),
    code: Joi.object({
      value: Joi.string().required(),
      id: Joi.string().required(),
    }),
  },
});

passwordRoutes.post(
  '/request-password',
  validateRequestBody,
  generateCodeController.handle,
);
passwordRoutes.post(
  '/check-code',
  validateCheckCodeBody,
  checkCodeController.handle,
);
passwordRoutes.post(
  '/recover-password',
  isAuthenticate,
  validateRecoverBody,
  recoverPasswordController.handle,
);

export { passwordRoutes };
