"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const UserController_1 = __importDefault(require("../controller/UserController"));
const express_1 = require("express");
const routes = (0, express_1.Router)();
routes.use('/usuario', UserController_1.default);
exports.default = routes;
