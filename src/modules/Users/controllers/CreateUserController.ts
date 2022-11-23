import { Request, Response } from 'express';
import { ICreateUserRequest } from '@interfaces/userInterfaces';
import { CreateUserService } from '../services/CreateUserService';

class CreateUserController {
  async handle(req: Request, res: Response) {
    const {
      address,
      cep,
      complement,
      cpf,
      email,
      full_name,
      gender,
      password,
      phone,
      social_name,
    } = req.body as ICreateUserRequest;

    const service = new CreateUserService();
    const result = await service.execute({
      address,
      cep,
      complement,
      cpf,
      email: email.toLowerCase().trim(),
      full_name,
      gender,
      password,
      phone,
      social_name,
    });

    return res.json(result);
  }
}

export { CreateUserController };
