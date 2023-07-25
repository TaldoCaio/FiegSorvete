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

userControllerRouter.get('/buscaMes/:mes', async (req, res) => {
    try {
        const { mes } = req.params;
        const user = await prisma.users.findMany({
            where: {
                aniversario: {
                    contains: `-${mes}-`
                }
            }
        });
        res.status(200).json(user);
    } catch (error) {
        res.status(500).json({ error });
    }
});


userControllerRouter.post('/cadastrar', async (req: Request, res: Response) => {
    try {       
        const info: {nome: string, aniversario: string} = {
            nome: req.body.nome,
            aniversario: req.body.aniversario

        }

        const user = await prisma.users.create({
            data:{
                nome: info.nome,
                aniversario: info.aniversario

            },
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error})

    }
})

userControllerRouter.get('/busca/:user_id', async (req,res) => {
    try {
        const {user_id} = req.params
        const user = await prisma.users.findUnique({
            where:{
                user_id: parseInt(user_id)
            }
        })
        res.status(200).json(user)
    } catch (error) {
        res.status(500).json({error})

    }
    
})

export default userControllerRouter

