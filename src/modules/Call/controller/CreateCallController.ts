import { Request, Response } from 'express';
import { ICreateCallRequest } from '@interfaces/callInterfaces';
import { CreateCallService } from '../services/CreateCallService';

class CreateCallController {
  async handle(req: Request, res: Response): Promise<Response> {
    const { user_id, latitude, longitude } = req.body as ICreateCallRequest;

    const service = new CreateCallService();
    const result = await service.execute({
      user_id,
      latitude,
      longitude,
    });

    return res.json(result);
  }
}

export { CreateCallController };
