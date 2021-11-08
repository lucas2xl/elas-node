import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { CreateUserController } from '../controllers/CreateUserController';
import { GetUserController } from '../controllers/GetUserController';

const usersRoutes = Router();
const createUserController = new CreateUserController();
const getUserController = new GetUserController();

const validateBody = celebrate({
  [Segments.BODY]: {
    address: Joi.string().required(),
    cep: Joi.number().required(),
    complement: Joi.string().optional(),
    cpf: Joi.number().required(),
    email: Joi.string().email().required(),
    full_name: Joi.string().required(),
    gender: Joi.string().optional(),
    password: Joi.string().required(),
    phone: Joi.number().required(),
    social_name: Joi.string().optional(),
  },
});

usersRoutes.post('/', validateBody, createUserController.handle);
// usersRoutes.get("/:id", getUserController.handle);

export { usersRoutes };
