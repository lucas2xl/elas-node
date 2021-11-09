"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateCallController = void 0;

var _CreateCallService = require("../services/CreateCallService");

class CreateCallController {
  async handle(req, res) {
    const {
      user_id,
      latitude,
      longitude
    } = req.body;
    const service = new _CreateCallService.CreateCallService();
    const result = await service.execute({
      user_id,
      latitude,
      longitude
    });
    return res.json(result);
  }

}

exports.CreateCallController = CreateCallController;