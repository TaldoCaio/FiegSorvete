const express = require('express');
const Router = express.Router()

const usuarioRouter = require('../controller/usuario');
const cobrancaRouter = require('../controller/cobranca')

const router = Router

router.use('/cobranca', cobrancaRouter);
router.use('/usuario', usuarioRouter);

module.exports = Router