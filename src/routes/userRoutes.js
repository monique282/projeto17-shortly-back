import { Router } from "express";
import { registerTable } from "../schemas/userSchema.js";
import { validateJoiForAll } from "../middlewares/validateSchema.js";
import { registerPost } from "../controllers/controlRegistrationLogin.js";

const userRouter = Router();

userRouter.post("/signup", validateJoiForAll(registerTable), registerPost);


export default userRouter;