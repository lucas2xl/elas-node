import { IGenerateCodeRequest } from '@interfaces/passwordInterfaces';
import { Request, Response } from 'express';
import { GenerateCodeService } from '../services/GenerateCodeService';

class GenerateCodeController {
  async handle(req: Request, res: Response) {
    const { email } = req.body as IGenerateCodeRequest;

    const service = new GenerateCodeService();
    const result = await service.execute({ email });

    return res.json(result);
  }
}

export { GenerateCodeController };
