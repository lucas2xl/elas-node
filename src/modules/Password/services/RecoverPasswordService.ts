import { hash } from 'bcrypt';
import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';
import { User } from '@prisma/client';
import { IRecoverPasswordRequest } from '@interfaces/passwordInterfaces';

class RecoverPasswordService {
  public async execute({
    email,
    newPassword,
    code,
  }: IRecoverPasswordRequest): Promise<User> {
    let user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const isValidPasswordCode = await prismaClient.passwordCode.findFirst({
      where: {
        id: code.id,
      },
    });

    if (!isValidPasswordCode || isValidPasswordCode.status === 'invalid') {
      throw new AppError('Code invalid', 402);
    }

    const hashedNewPassword = await hash(newPassword, 8);

    user = await prismaClient.user.update({
      where: {
        email,
      },
      data: { password: hashedNewPassword },
    });

    const userCodes = await prismaClient.passwordCode.findMany({
      where: {
        id: code.id,
      },
    });

    for (const code of userCodes) {
      if (code.status === 'valid') {
        await prismaClient.passwordCode.update({
          where: {
            id: code.id,
          },
          data: {
            status: 'invalid',
          },
        });
      } else {
        await prismaClient.passwordCode.delete({
          where: {
            id: code.id,
          },
        });
      }
    }

    return user;
  }
}

export { RecoverPasswordService };
