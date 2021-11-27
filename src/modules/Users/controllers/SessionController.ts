import { Request, Response } from 'express';
import { ICreateSessionsRequest } from '@interfaces/userInterfaces';
import { SessionService } from '../services/SessionService';

class SessionsController {
  public async handle(req: Request, res: Response): Promise<Response> {
    const { email, password } = req.body as ICreateSessionsRequest;

    const createSession = new SessionService();

    const result = await createSession.execute({
      email: email.toLowerCase(),
      password,
    });

    return res.json(result);
  }
}

export { SessionsController };
