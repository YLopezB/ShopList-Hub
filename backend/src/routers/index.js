import { Router } from "express";
import userRouter from "./userRouter.js";
import authRouter from "./auth.js";
import productRouter from "./productRouter.js";
import storeRouter from "./storeRouter.js";

const routerIndex = Router();

routerIndex.use("/user", userRouter);
routerIndex.use("/login", authRouter);
routerIndex.use("/product", productRouter);
routerIndex.use("/store", storeRouter);

export default routerIndex;
