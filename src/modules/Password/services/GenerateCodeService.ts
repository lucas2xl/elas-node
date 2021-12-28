import { sendGridEmail } from '@configs/sendGridEmail';
import { ICode, IGenerateCodeRequest } from '@interfaces/passwordInterfaces';
import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

interface IResponse {
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

class GenerateCodeService {
  public async execute({ email }: IGenerateCodeRequest): Promise<IResponse> {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    let alreadyExistCode, code;

    while (!code) {
      code = makeCode(6);
      alreadyExistCode = await prismaClient.passwordCode.findFirst({
        where: { code },
      });

      if (alreadyExistCode) {
        code = '';
      }
    }

    const passwordCode = await prismaClient.passwordCode.create({
      data: {
        user_id: user.id,
        code,
        status: 'valid',
      },
    });

    sendGridEmail.send({ code, to: email });

    return { code: { id: passwordCode.id, value: passwordCode.code } };
  }
}

export { GenerateCodeService };
