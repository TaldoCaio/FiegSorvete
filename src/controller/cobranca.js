const Cobranca = require('../models/cobrancaSchema');
const express = require('express');
const router = express.Router();

const cobrancaRouter = router

//post com verificação de existencia
cobrancaRouter.post('/gerar', async (req, res) => {
    try {
        const { dataSorvete, idCobrado } = req.body;

        const cobrancaExistente = await Cobranca.findOne({ dataSorvete, idCobrado });

        if (cobrancaExistente) {
            return res.status(400).json("Essa cobrança já existe");
        } else {
            const cobranca = await Cobranca.create(req.body);
            return res.status(200).json(cobranca);
        }
    } catch (error) {
        return res.status(500).json({ message: error.message });
    }
});

//get por idCobrado(id do USUÁRIO)
cobrancaRouter.get('/buscar/:idCobrado', async (req, res) => {
    try {
        const { idCobrado } = req.params
        const cobranca = await Cobranca.find({ idCobrado }, { _id: 0, idCobrado: 1, cobStatus: 1 })
        res.status(200).json(cobranca)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
}),

//get geral
cobrancaRouter.get('/buscar', async (req, res) => {
        try {
            const cobranca = await Cobranca.find({})
            res.status(200).json(cobranca)
        } catch (error) {
            res.status(500).json({ message: error.message })
        }
})

module.exports = cobrancaRouter