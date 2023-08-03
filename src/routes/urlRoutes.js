import { Router } from "express";
import { urlSentByUser } from "../schemas/urlSchema.js";
import { urlsPost } from "../controllers/controlUrls.js";
import { validateJoiForAll } from "../middlewares/validateSchema.js";


const urlRouter = Router();

urlRouter.post("/urls/shorten", validateJoiForAll(urlSentByUser), urlsPost);


export default urlRouter;