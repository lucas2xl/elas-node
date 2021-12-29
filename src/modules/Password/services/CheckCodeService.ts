import { authConfig } from '@configs/Auth';
import { ICheckCodeRequest, ICode } from '@interfaces/passwordInterfaces';
import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';
import { sign } from 'jsonwebtoken';

interface IResponse {
  token: string;
  code: ICode;
}

const makeCode = (size: number) => {
  let result = '';
  const characters = '0123456789';
  const charactersLength = characters.length;
  for (var i = 0; i < size; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
  }
  return result;
};

class CheckCodeService {
  public async execute({ email, code }: ICheckCodeRequest): Promise<IResponse> {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const userCode = await prismaClient.passwordCode.findFirst({
      where: {
        user_id: user.id,
        code,
      },
    });

    if (!userCode || userCode.status === 'invalid') {
      throw new AppError('Invalid code', 402);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });

    return { token, code: { id: userCode.id, value: userCode.code } };
  }
}

export { CheckCodeService };
