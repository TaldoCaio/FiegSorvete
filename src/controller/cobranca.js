const express = require('express');
const Router = express.Router()
const {PrismaClient} = require('@prisma/client');

const cobrancaRouter = Router
const prisma = new PrismaClient()

cobrancaRouter.post('/gerar', async (req,res)=>{
    try {
        const {dataSorvete,idCobrado} = req.body;
        const cobrancaExistente = await prisma.cobrancas.findMany({
            where:{
                dataSorvete: dataSorvete,
                idCobrado: idCobrado
            }
        })
        
        if (cobrancaExistente){
            return res.status(400).json("Essa cobrança já existe")
        }{
            const cobranca = await prisma.cobrancas.create(req.body)
            return res.status(200).json(cobranca)
        }
    } catch (error) {
        return res.status(500).json({message: error.message});
        
    }
})

cobrancaRouter.get('/buscar', async (req, res) => {
    try {
        const cobranca = await prisma.cobrancas.findUnique({
            where:{
                id: '6480aaa1382182bbd903feb2',
            },
        })
        res.status(200).json(cobranca)
    } catch (error) {
        res.status(500).json({ message: error.message })
    }
})

module.exports = cobrancaRouter