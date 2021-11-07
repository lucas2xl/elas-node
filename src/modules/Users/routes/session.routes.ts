import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { SessionsController } from '../controllers/SessionController';

const sessionRoutes = Router();
const sessionsController = new SessionsController();

const validateBody = celebrate({
  [Segments.BODY]: {
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  },
});

sessionRoutes.post('/', validateBody, sessionsController.handle);

export { sessionRoutes };
