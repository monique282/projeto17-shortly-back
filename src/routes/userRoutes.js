import { Router } from "express";
import { registerTable } from "../schemas/userSchema.js";
import { validateJoiForAll } from "../middlewares/validateSchema.js";
import { loginPost, registerPost } from "../controllers/controlRegistrationLogin.js";

const userRouter = Router();

userRouter.post("/signup", validateJoiForAll(registerTable), registerPost);
userRouter.post("/signin", validateJoiForAll(registerTable), loginPost);

export default userRouter;