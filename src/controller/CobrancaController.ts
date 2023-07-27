import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from 'express';

const cobrancaControllerRouter = Router()
const prisma = new PrismaClient()

cobrancaControllerRouter.post('/gerar', async (req,res) => {
    try {
        const {datasorvete, idCobrado} = req.body     

        const cobrancaExistente = await prisma.cobranca.findMany({
            where:{
                datasorvete: req.body.datasorvete,
                idCobrado: req.body.idCobrado
            }
        })
        
        if(cobrancaExistente.length > 0){
            res.status(400).json('Essa cobranca já existe')
        } else {  
            const cobranca = await prisma.cobranca.create({
                data:{
                    idCobrado: parseInt(idCobrado),
                    datasorvete: datasorvete,
                    statusCobranca: "A"
                }
            })
            res.status(200).json(cobranca)
        }
    } catch (error) {
        res.status(500).json({error})    
    }
})

cobrancaControllerRouter.get('/buscar', async (req,res) => {
    try {
        const cobranca = await prisma.cobranca.findMany()
        res.status(200).json(cobranca)
    } catch (error) {
        res.status(500).json(error)
    }
})

cobrancaControllerRouter.get('/buscar/:cobranca_id', async (req,res) =>{
    try {
        const {cobranca_id} = req.params
        const cobranca = await prisma.cobranca.findUnique({
            where: {
                cobranca_id: parseInt(cobranca_id)
            }
        })
        res.status(200).json(cobranca)
    } catch (error) {
        res.status(500).json(error)
    }
})

cobrancaControllerRouter.get('/buscar/usuario/:idCobrado', async (req,res) => {
    try {
        const {idCobrado} = req.params
        const cobranca = await prisma.cobranca.findMany({
            where: {
                idCobrado: parseInt(idCobrado)
            }
        })
        if(cobranca.length > 0){
            res.status(200).json(cobranca)    
        }else{
            res.status(404).json(cobranca)
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

cobrancaControllerRouter.delete('/deletar/:cobranca_id', async (req,res) => {
    try {
        const {cobranca_id} = req.params
        const cobranca = await prisma.cobranca.delete({
            where: {
                cobranca_id: parseInt(cobranca_id)
            }
        })
        res.status(200).json(cobranca)
    } catch (error) {
        res.status(500).json(error)
    }
})
export default cobrancaControllerRouter