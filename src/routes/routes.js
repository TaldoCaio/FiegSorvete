const express = require('express');
const Router = express.Router()

const usuarioRouter = require('../controller/usuario');
const cobrancaRouter = require('../controller/cobranca')

Router.use('/cobranca', cobrancaRouter);
Router.use('/usuario', usuarioRouter);

module.exports = Router;