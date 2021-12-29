import { ICheckCodeRequest } from '@interfaces/passwordInterfaces';
import { Request, Response } from 'express';
import { CheckCodeService } from '../services/CheckCodeService';

class CheckCodeController {
  async handle(req: Request, res: Response) {
    const { email, code } = req.body as ICheckCodeRequest;

    const service = new CheckCodeService();
    const result = await service.execute({ email, code });

    return res.json(result);
  }
}

export { CheckCodeController };
