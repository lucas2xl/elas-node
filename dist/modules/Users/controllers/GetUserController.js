"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.GetUserController = void 0;

var _GetUserService = require("../services/GetUserService");

class GetUserController {
  async handle(req, res) {
    const {
      id
    } = req.params;
    const service = new _GetUserService.GetUserService();
    const result = await service.execute({
      id
    });
    return res.json(result);
  }

}

exports.GetUserController = GetUserController;