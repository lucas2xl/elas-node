"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateUserController = void 0;

var _CreateUserService = require("../services/CreateUserService");

class CreateUserController {
  async handle(req, res) {
    const {
      address,
      cep,
      complement,
      cpf,
      email,
      full_name,
      gender,
      password,
      phone,
      social_name
    } = req.body;
    const service = new _CreateUserService.CreateUserService();
    const result = await service.execute({
      address,
      cep,
      complement,
      cpf,
      email,
      full_name,
      gender,
      password,
      phone,
      social_name
    });
    return res.json(result);
  }

}

exports.CreateUserController = CreateUserController;