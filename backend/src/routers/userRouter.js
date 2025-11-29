import { Router } from "express";
import create from "../controllers/user/create.js";
import createHash from "../middlewares/createHash.js";

const userRouter = Router()

userRouter.post("/", createHash, create)

export default userRouter