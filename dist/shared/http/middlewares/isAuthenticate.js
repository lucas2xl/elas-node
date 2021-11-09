"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.isAuthenticate = void 0;

var _Auth = require("../../../configs/Auth");

var _AppError = require("../../errors/AppError");

var _jsonwebtoken = require("jsonwebtoken");

const isAuthenticate = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader) {
    throw new _AppError.AppError('JWT Token is missing.');
  }

  const [, token] = authHeader.split(' ');

  try {
    const decodedToken = (0, _jsonwebtoken.verify)(token, _Auth.authConfig.jwt.secret);
    const {
      sub
    } = decodedToken;
    req.user = {
      id: sub
    };
    return next();
  } catch {
    throw new _AppError.AppError('Invalid JWT Token.');
  }
};

exports.isAuthenticate = isAuthenticate;