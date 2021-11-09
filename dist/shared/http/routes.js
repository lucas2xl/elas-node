"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.routes = void 0;

var _call = require("../../modules/Call/routes/call.routes");

var _session = require("../../modules/Users/routes/session.routes");

var _users = require("../../modules/Users/routes/users.routes");

var _express = require("express");

const routes = (0, _express.Router)();
exports.routes = routes;
routes.use('/users', _users.usersRoutes);
routes.use('/login', _session.sessionRoutes);
routes.use('/calls', _call.callRoutes);