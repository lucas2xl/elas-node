"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserService = void 0;

var _bcrypt = require("bcrypt");

var _userInterfaces = require("../../../interfaces/userInterfaces");

var _AppError = require("../../../shared/errors/AppError");

var _prisma = require("../../../shared/prisma");

class CreateUserService {
  async execute({
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
    role = _userInterfaces.IRole.victim
  }) {
    let user = await _prisma.prismaClient.user.findFirst({
      where: {
        email
      }
    });

    if (user) {
      throw new _AppError.AppError('Email address already used.', 400);
    }

    const hashedPassword = await (0, _bcrypt.hash)(password, 8);

    if (!user) {
      user = await _prisma.prismaClient.user.create({
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
          role
        }
      });
    }

    return user;
  }

}

exports.CreateUserService = CreateUserService;