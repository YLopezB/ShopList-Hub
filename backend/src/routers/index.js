import { Router } from "express";
import userRouter from "./userRouter.js"
import authRouter from "./auth.js";

const routerIndex = Router()

routerIndex.use("/user", userRouter)
routerIndex.use("/login", authRouter)

export default routerIndex