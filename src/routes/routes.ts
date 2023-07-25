import userControllerRouter from "../controller/UserController";
import cobrancaControllerRouter from "../controller/CobrancaController";
import { Router } from "express";

const routes = Router()

routes.use('/usuario', userControllerRouter)
routes.use('/cobranca', cobrancaControllerRouter)

export default routes
