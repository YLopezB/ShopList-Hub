import { Router } from "express";
import create from "../controllers/user/create.js";
import createHash from "../middlewares/createHash.js";
import validarId from "../controllers/user/validarId.js"

const userRouter = Router()

userRouter.post("/", createHash, create)
userRouter.post("/validate", validarId)

export default userRouter