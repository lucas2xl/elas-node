"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCallService = void 0;

var _prisma = require("../../../shared/prisma");

var _AppError = require("../../../shared/errors/AppError");

var _callInterfaces = require("../../../interfaces/callInterfaces");

class CreateCallService {
  async execute({
    status = _callInterfaces.IStatus.waiting,
    user_id,
    latitude,
    longitude
  }) {
    let user = await _prisma.prismaClient.user.findFirst({
      where: {
        id: user_id
      }
    });

    if (!user) {
      throw new _AppError.AppError('User not found', 400);
    }

    const call = await _prisma.prismaClient.call.create({
      data: {
        status,
        user_id,
        latitude,
        longitude
      }
    });
    return {
      call,
      user
    };
  }

}

exports.CreateCallService = CreateCallService;