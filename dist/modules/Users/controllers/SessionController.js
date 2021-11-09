"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SessionsController = void 0;

var _SessionService = require("../services/SessionService");

class SessionsController {
  async handle(req, res) {
    const {
      email,
      password
    } = req.body;
    const createSession = new _SessionService.SessionService();
    const result = await createSession.execute({
      email,
      password
    });
    return res.json(result);
  }

}

exports.SessionsController = SessionsController;