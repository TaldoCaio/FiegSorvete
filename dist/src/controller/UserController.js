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
const prisma = new client_1.PrismaClient();
const userControllerRouter = (0, express_1.Router)();
userControllerRouter.get('/buscarTodos', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const user = yield prisma.users.findMany();
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ message: Error });
    }
}));
userControllerRouter.get('/buscaMes/:mes', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { mes } = req.params;
        const user = yield prisma.users.findMany({
            where: {
                aniversario: {
                    contains: `-${mes}-`
                }
            }
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
userControllerRouter.post('/cadastrar', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const info = {
            nome: req.body.nome,
            aniversario: req.body.aniversario
        };
        const user = yield prisma.users.create({
            data: {
                nome: info.nome,
                aniversario: info.aniversario
            },
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
userControllerRouter.get('/busca/:user_id', (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const { user_id } = req.params;
        const user = yield prisma.users.findUnique({
            where: {
                user_id: parseInt(user_id)
            }
        });
        res.status(200).json(user);
    }
    catch (error) {
        res.status(500).json({ error });
    }
}));
exports.default = userControllerRouter;
