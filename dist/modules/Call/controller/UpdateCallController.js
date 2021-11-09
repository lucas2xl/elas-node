"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.UpdateCallController = void 0;

var _UpdateCallService = require("../services/UpdateCallService");

class UpdateCallController {
  async handle(req, res) {
    const {
      id,
      status
    } = req.body;
    const service = new _UpdateCallService.UpdateCallService();
    const result = await service.execute({
      id,
      status
    });
    return res.json(result);
  }

}

exports.UpdateCallController = UpdateCallController;