import { prismaClient } from '@shared/prisma';
import { AppError } from '@shared/errors/AppError';
import { IUpdateCallRequest } from '@interfaces/callInterfaces';

class UpdateCallService {
  public async execute({ id, status }: IUpdateCallRequest): Promise<void> {
    let call = await prismaClient.call.findFirst({
      where: {
        id,
      },
    });

    if (!call) {
      throw new AppError('Call not found', 400);
    }

    await prismaClient.call.update({
      where: {
        id,
      },
      data: {
        status,
      },
    });
  }
}

export { UpdateCallService };
