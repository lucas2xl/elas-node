import { Request, Response } from 'express';
import { IUpdateCallRequest } from '@interfaces/callInterfaces';
import { UpdateCallService } from '../services/UpdateCallService';

class UpdateCallController {
  async handle(req: Request, res: Response) {
    const { id, status } = req.body as IUpdateCallRequest;

    const service = new UpdateCallService();
    const result = await service.execute({ id, status });

    return res.json(result);
  }
}

export { UpdateCallController };
