"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateCallService = void 0;

var _prisma = require("../../../shared/prisma");

var _AppError = require("../../../shared/errors/AppError");

class UpdateCallService {
  async execute({
    id,
    status
  }) {
    let call = await _prisma.prismaClient.call.findFirst({
      where: {
        id
      }
    });

    if (!call) {
      throw new _AppError.AppError('Call not found', 400);
    }

    await _prisma.prismaClient.call.update({
      where: {
        id
      },
      data: {
        status
      }
    });
  }

}

exports.UpdateCallService = UpdateCallService;