import { Request, Response } from 'express';
import { IGetUserRequest } from '@interfaces/userInterfaces';
import { GetUserService } from '../services/GetUserService';

class GetUserController {
  async handle(req: Request, res: Response) {
    const { id } = req.params as IGetUserRequest;

    const service = new GetUserService();
    const result = await service.execute({ id });

    return res.json(result);
  }
}

export { GetUserController };
