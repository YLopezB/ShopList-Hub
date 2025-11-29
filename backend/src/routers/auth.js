import { Router } from "express";
import existAccount from "../middlewares/existAccount.js";
import validatePassword from "../middlewares/validatePassword.js";
import login from "../controllers/auth/login.js";

const authRouter = Router()

authRouter.post("/", existAccount, validatePassword, login)

export default authRouter