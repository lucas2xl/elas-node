import { User } from '.prisma/client';
import { hash } from 'bcrypt';
import { ICreateUserRequest } from '@interfaces/userInterfaces';
import { AppError } from '@shared/errors/AppError';
import { prismaClient } from '@shared/prisma';

class CreateUserService {
  public async execute({
    address,
    cep,
    complement,
    cpf,
    email,
    full_name,
    gender,
    password,
    phone,
    social_name,
  }: ICreateUserRequest): Promise<User> {
    let user = await prismaClient.user.findFirst({
      where: {
        email,
      },
    });

    if (user) {
      throw new AppError('Email address already used.', 400);
    }

    const hashedPassword = await hash(password, 8);

    if (!user) {
      user = await prismaClient.user.create({
        data: {
          address,
          cep,
          complement,
          cpf,
          email,
          full_name,
          gender,
          password: hashedPassword,
          phone,
          social_name,
        },
      });
    }

    return user;
  }
}

export { CreateUserService };
