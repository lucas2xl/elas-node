import { hash } from 'bcrypt';
import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';
import { IRecoverPasswordRequest } from '@interfaces/passwordInterfaces';

interface IResponse {
  user_id: string;
}

class RecoverPasswordService {
  public async execute({
    email,
    newPassword,
    code,
  }: IRecoverPasswordRequest): Promise<IResponse> {
    let user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const userCode = await prismaClient.passwordCode.findFirst({
      where: {
        id: code.id,
        user_id: user.id,
      },
    });

    if (!userCode) {
      throw new AppError(`The code doesn't exist`, 402);
    }

    const hashedNewPassword = await hash(newPassword, 8);

    user = await prismaClient.user.update({
      where: {
        email,
      },
      data: {
        password: hashedNewPassword,
        PasswordCode: {
          update: {
            where: {
              id: userCode.id,
            },
            data: { status: 'invalid' },
          },
        },
      },
    });

    return { user_id: user.id };
  }
}

export { RecoverPasswordService };
