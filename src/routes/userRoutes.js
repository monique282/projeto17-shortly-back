import { Router } from "express";
import { customersTable } from "../schemas/customersSchema.js";
import { validateJoiForAll } from "../middlewares/validateSchema.js";
import { Register } from "../controllers/controlRegistrationLogin.js";

const customerRouter = Router();

customerRouter.post("/signup", validateJoiForAll(customersTable), Register);


export default customerRouter;