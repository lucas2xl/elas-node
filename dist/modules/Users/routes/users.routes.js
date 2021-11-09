"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.usersRoutes = void 0;

var _express = require("express");

var _celebrate = require("celebrate");

var _CreateUserController = require("../controllers/CreateUserController");

var _GetUserController = require("../controllers/GetUserController");

const usersRoutes = (0, _express.Router)();
exports.usersRoutes = usersRoutes;
const createUserController = new _CreateUserController.CreateUserController();
const getUserController = new _GetUserController.GetUserController();
const validateBody = (0, _celebrate.celebrate)({
  [_celebrate.Segments.BODY]: {
    address: _celebrate.Joi.string().required(),
    cep: _celebrate.Joi.number().required(),
    complement: _celebrate.Joi.string().optional(),
    cpf: _celebrate.Joi.number().required(),
    email: _celebrate.Joi.string().email().required(),
    full_name: _celebrate.Joi.string().required(),
    gender: _celebrate.Joi.string().optional(),
    password: _celebrate.Joi.string().required(),
    phone: _celebrate.Joi.number().required(),
    social_name: _celebrate.Joi.string().optional()
  }
});
usersRoutes.post('/', validateBody, createUserController.handle); // usersRoutes.get("/:id", getUserController.handle);