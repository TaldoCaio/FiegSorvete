const express = require('express');
const Router = express.Router();
const User = require('../models/cadastroSchema');
const {PrismaClient} = require('@prisma/client');

const usuarioRouter = Router
const prisma = new PrismaClient()

usuarioRouter.post('/cadastro', async (req, res) => {
    try {
        const {nome,aniversario} = req.body
        const user = await prisma.user.create({
            data: {
                
            }
        })
        const newUser = user
        res.status(200).json(newUser);

    } catch (error) {
        console.log(error)
        res.status(500).json({ message: error.message });
    }
});

usuarioRouter.get('/busca', async (req, res) => {
    try {
        const user = await prisma.user.find({})
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

usuarioRouter.get('/buscaDatas', async (req, res) => {
    try {
        const user = await User.find({}, { aniversario: 1, _id: 1, nome: 1 })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

usuarioRouter.get('/buscaMes/:aniversario', async (req, res) => {
    try {
        const { aniversario } = req.params;
        const month = parseInt(aniversario);

        const user = await User.aggregate([
            {
                $project: {
                    nome: 1,
                    _id: 1,
                    mesAniversario: { $month: '$aniversario' },
                    aniversario: 1
                }
            },
            {
                $match: {
                    $expr: { $eq: [month, '$mesAniversario'] }
                }
            }
        ]);
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

usuarioRouter.get('/busca/:_id', async (req, res) => {
    try {
        const {_id} = req.params
        const user = User.findById(_id)
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = usuarioRouter