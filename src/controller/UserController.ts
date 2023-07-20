import { PrismaClient } from "@prisma/client";
import { Router } from 'express';

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

userControllerRouter.get('/buscaDatas',async (req, res) => {
    try {
        const user = await prisma.users.findMany()
    } catch (error) {
        
    }
})

export default userControllerRouter

