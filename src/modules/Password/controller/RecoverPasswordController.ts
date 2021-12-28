import { IRecoverPasswordRequest } from '@interfaces/passwordInterfaces';
import { Request, Response } from 'express';
import { RecoverPasswordService } from '../services/RecoverPasswordService';

class RecoverPasswordController {
  async handle(req: Request, res: Response) {
    const { email, code, newPassword } = req.body as IRecoverPasswordRequest;

    const service = new RecoverPasswordService();
    const result = await service.execute({ email, code, newPassword });

    return res.json(result);
  }
}

export { RecoverPasswordController };
