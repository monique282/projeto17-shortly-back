import { Router } from "express";
import { loginTable, registerTable } from "../schemas/userSchema.js";
import { validateJoiForAll } from "../middlewares/validateSchema.js";
import { loginPost, registerPost, userMeGet } from "../controllers/controlUsers.js";

const userRouter = Router();

userRouter.post("/signup", validateJoiForAll(registerTable), registerPost);
userRouter.post("/signin", validateJoiForAll(loginTable), loginPost);
userRouter.get("/users/me", userMeGet);

export default userRouter;