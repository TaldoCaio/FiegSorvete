"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const express_1 = require("express");
const cobrancaControllerRouter = (0, express_1.Router)();
const prisma = new client_1.PrismaClient();
cobrancaControllerRouter.post('/gerar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { datasorvete, idCobrado } = req.body;
        const cobrancaExistente = yield prisma.cobranca.findMany({
            where: {
                datasorvete: req.body.datasorvete,
                idCobrado: req.body.idCobrado
            }
        });
        if (!cobrancaExistente) {
            return res.sendStatus(400).json('Essa cobranca já existe');
        }
        {
            const cobranca = yield prisma.cobranca.create({
                data: {
                    idCobrado: parseInt(idCobrado),
                    datasorvete: datasorvete,
                    statusCobranca: "A"
                }
            });
            return res.status(200).json(cobranca);
        }
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
cobrancaControllerRouter.get('/buscar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const cobranca = yield prisma.cobranca.findMany();
        res.status(200).json(cobranca);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
cobrancaControllerRouter.get('/buscar/:cobranca_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { cobranca_id } = req.params;
        const cobranca = yield prisma.cobranca.findUnique({
            where: {
                cobranca_id: parseInt(cobranca_id)
            }
        });
        res.status(200).json(cobranca);
    }
    catch (error) {
        res.status(500).json(error);
    }
}));
exports.default = cobrancaControllerRouter;
