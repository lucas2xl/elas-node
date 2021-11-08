import { Call, User } from '.prisma/client';
import { prismaClient } from '@shared/prisma';
import { AppError } from '@shared/errors/AppError';
import { ICreateCallRequest, IStatus } from '@interfaces/callInterfaces';

interface ICallResponse {
  user: User;
  call: Call;
}

class CreateCallService {
  public async execute({
    status = IStatus.waiting,
    user_id,
    latitude,
    longitude,
  }: ICreateCallRequest): Promise<ICallResponse> {
    let user = await prismaClient.user.findFirst({
      where: {
        id: user_id,
      },
    });

    if (!user) {
      throw new AppError('User not found', 400);
    }

    const call = await prismaClient.call.create({
      data: {
        status,
        user_id,
        latitude,
        longitude,
      },
    });

    return { call, user };
  }
}

export { CreateCallService };
