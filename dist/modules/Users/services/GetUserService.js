"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetUserService = void 0;

var _AppError = require("../../../shared/errors/AppError");

var _prisma = require("../../../shared/prisma");

class GetUserService {
  async execute({
    id
  }) {
    let user = await _prisma.prismaClient.user.findFirst({
      where: {
        id
      }
    });

    if (!user) {
      throw new _AppError.AppError('User not found', 400);
    }

    return user;
  }

}

exports.GetUserService = GetUserService;