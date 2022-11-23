import { compare } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { User } from '.prisma/client';
import { authConfig } from '@configs/Auth';
import { ICreateSessionsRequest } from '@interfaces/userInterfaces';
import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

interface IResponse {
  user: User;
  token: string;
}

class SessionService {
  public async execute({
    email,
    password,
  }: ICreateSessionsRequest): Promise<IResponse> {
    const user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (!user) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const passwordConfirmed = await compare(password, user.password);

    if (!passwordConfirmed) {
      throw new AppError('Incorrect email/password combination', 401);
    }

    const token = sign({}, authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: authConfig.jwt.expiresIn,
    });
    console.log(token);

    return { user, token };
  }
}

export { SessionService };
