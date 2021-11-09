"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionService = void 0;

var _bcrypt = require("bcrypt");

var _jsonwebtoken = require("jsonwebtoken");

var _Auth = require("../../../configs/Auth");

var _AppError = require("../../../shared/errors/AppError");

var _prisma = require("../../../shared/prisma");

class SessionService {
  async execute({
    email,
    password
  }) {
    let user = await _prisma.prismaClient.user.findFirst({
      where: {
        email
      }
    });

    if (!user) {
      throw new _AppError.AppError('Incorrect email/password combination', 401);
    }

    const passwordConfirmed = await (0, _bcrypt.compare)(password, user.password);

    if (!passwordConfirmed) {
      throw new _AppError.AppError('Incorrect email/password combination', 401);
    }

    const token = (0, _jsonwebtoken.sign)({}, _Auth.authConfig.jwt.secret, {
      subject: user.id,
      expiresIn: _Auth.authConfig.jwt.expiresIn
    });
    return {
      user,
      token
    };
  }

}

exports.SessionService = SessionService;