"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.authConfig = void 0;
const authConfig = {
  jwt: {
    secret: String(process.env.JWT_SECRET),
    expiresIn: '1d'
  }
};
exports.authConfig = authConfig;