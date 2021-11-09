"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.prismaClient = void 0;

var _client = require(".prisma/client");

const prismaClient = new _client.PrismaClient();
exports.prismaClient = prismaClient;