"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.app = void 0;

require("dotenv/config");

require("express-async-errors");

var _express = _interopRequireDefault(require("express"));

var _cors = _interopRequireDefault(require("cors"));

var _celebrate = require("celebrate");

var _routes = require("./routes");

var _AppError = require("../errors/AppError");

var _swaggerUiExpress = _interopRequireDefault(require("swagger-ui-express"));

var _docs = _interopRequireDefault(require("../../configs/docs.json"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

const app = (0, _express.default)();
exports.app = app;
app.use((0, _cors.default)());
app.use(_express.default.json());
app.use('/api-docs', _swaggerUiExpress.default.serve, _swaggerUiExpress.default.setup(_docs.default));
app.use('/v1', _routes.routes);
app.use((0, _celebrate.errors)());
app.use((error, req, res, next) => {
  if (error instanceof _AppError.AppError) {
    return res.status(error.statusCode).json({
      status: 'error',
      message: error.message
    });
  }

  return res.status(500).json({
    status: 'error',
    message: 'Internal server error'
  });
});