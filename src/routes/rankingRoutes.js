import { Router } from "express";
import { rankingGet } from "../controllers/controlRanking.js";


const rankingRouter = Router();

rankingRouter.get("/ranking", rankingGet);



export default rankingRouter;