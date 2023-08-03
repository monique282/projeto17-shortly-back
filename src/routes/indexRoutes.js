// esse arquivo serve pra unir todos que eu estou escrevendo Rotas que esta dentro de Routes
// lebrando que todas as Rotas aqui vai pro app

import { Router } from "express";
import userRouter from "./userRoutes.js";

const router = Router()

router.use([
    // rota para os cadastro
    userRouter
]);

export default router;
