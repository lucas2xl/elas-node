"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.IStatus = void 0;
let IStatus;
exports.IStatus = IStatus;

(function (IStatus) {
  IStatus["waiting"] = "Waiting";
  IStatus["in_progress"] = "In progress";
  IStatus["concluded"] = "Concluded";
})(IStatus || (exports.IStatus = IStatus = {}));