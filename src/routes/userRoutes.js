import { Router } from "express";
import { customersTable } from "../schemas/userSchema.js";
import { validateJoiForAll } from "../middlewares/validateSchema.js";
import { Register } from "../controllers/controlRegistrationLogin.js";

const userRouter = Router();

userRouter.post("/signup", validateJoiForAll(customersTable), Register);


export default userRouter;