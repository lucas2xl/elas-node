import { Request, Response } from 'express';

import { GetCallService } from '../services/GetCallService';

class GetCallController {
  async handle(req: Request, res: Response): Promise<Response> {
    const service = new GetCallService();
    const result = await service.execute();

    return res.json(result);
  }
}

export { GetCallController };
