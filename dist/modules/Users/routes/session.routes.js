"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sessionRoutes = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _SessionController = require("../controllers/SessionController");

const sessionRoutes = (0, _express.Router)();
exports.sessionRoutes = sessionRoutes;
const sessionsController = new _SessionController.SessionsController();
const validateBody = (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    email: _celebrate.Joi.string().email().required(),
    password: _celebrate.Joi.string().required()
  }
});
sessionRoutes.post('/', validateBody, sessionsController.handle);