import { Router } from "express";
import { urlSentByUser } from "../schemas/urlSchema.js";
import { urlsGet, urlsOpenGet, urlsPost } from "../controllers/controlUrls.js";
import { validateJoiForAll } from "../middlewares/validateSchema.js";


const urlRouter = Router();

urlRouter.post("/urls/shorten", validateJoiForAll(urlSentByUser), urlsPost);
urlRouter.get("/urls/:id", urlsGet);
urlRouter.get("/urls/open/:shortUrl", urlsOpenGet);

export default urlRouter;