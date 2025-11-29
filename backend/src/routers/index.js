import { Router } from "express";
import userRouter from "./userRouter.js"

const routerIndex = Router()

routerIndex.use("/user", userRouter)

export default routerIndex