import userControllerRouter from "../controller/UserController";
import { Router } from "express";

const routes = Router()

routes.use('/usuario', userControllerRouter)

export default routes