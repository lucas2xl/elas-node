import { User } from '.prisma/client';
import { IGetUserRequest } from '@interfaces/userInterfaces';
import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

class GetUserService {
  public async execute({ id }: IGetUserRequest): Promise<User> {
    const user = await prismaClient.user.findFirst({
      where: {
        id,
      },
    });

    if (!user) {
      throw new AppError('User not found', 400);
    }

    return user;
  }
}

export { GetUserService };
