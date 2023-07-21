import { PrismaClient } from "@prisma/client";
import { Router, Request, Response } from 'express';

const prisma = new PrismaClient()
const userControllerRouter = Router()


userControllerRouter.get('/buscarTodos', async (req, res) => {
    try {
        const user = await prisma.users.findMany()
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({message: Error})
    }
})

userControllerRouter.get('/buscaMes/:aniversario',async (req, res) => {
    try {
        const {aniversario} = req.params;
        const data = aniversario.substring(0,10)
        const [ano, mes, dia] = data.split('-')
        
        const user = await prisma.users.findMany({
            where:{
                aniversario: {
                    equals: mes
                }
            }
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error})
    }
})

userControllerRouter.post('/cadastrar', async (req: Request, res: Response) => {
    try {
        const {inputNome,inputAniversario} = req.body
        console.log(req.body)
        const user = await prisma.users.create({
            data:{

                aniversario: inputAniversario,
                nome: inputNome
            },
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error})
        console.log(error)
    }
})

export default userControllerRouter

