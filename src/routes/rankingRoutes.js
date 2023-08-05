import { Router } from "express";


const rankingRouter = Router();

rankingRouter.get("/ranking", rankingGet);



export default rankingRouter;