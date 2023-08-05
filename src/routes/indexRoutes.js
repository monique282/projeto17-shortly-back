// esse arquivo serve pra unir todos que eu estou escrevendo Rotas que esta dentro de Routes
// lebrando que todas as Rotas aqui vai pro app

import { Router } from "express";
import userRouter from "./userRoutes.js";
import urlRouter from "./urlRoutes.js";
import rankingRouter from "./rankingRoutes.js";

const router = Router()

router.use([
    // rota para os usuario
    userRouter,

    // rotas das urls
    urlRouter,

    // tora de ranking
    rankingRouter
]);

export default router;
