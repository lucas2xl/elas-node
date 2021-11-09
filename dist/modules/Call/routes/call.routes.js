"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.callRoutes = void 0;

var _express = require("express");

var _isAuthenticate = require("../../../shared/http/middlewares/isAuthenticate");

var _CreateCallController = require("../controller/CreateCallController");

var _UpdateCallController = require("../controller/UpdateCallController");

const callRoutes = (0, _express.Router)();
exports.callRoutes = callRoutes;
const createCallController = new _CreateCallController.CreateCallController();
const updateCallController = new _UpdateCallController.UpdateCallController();
callRoutes.post('/', _isAuthenticate.isAuthenticate, createCallController.handle);
callRoutes.put('/', _isAuthenticate.isAuthenticate, updateCallController.handle);