import { Router } from "express";
import ReadS from "../controllers/store/read.js";
import CreateS from "../controllers/store/create.js";
import DeleteS from "../controllers/store/delete.js";
import UpdateP from "../controllers/store/update.js";

const storeRouter = Router();

storeRouter.get("/", ReadS);
storeRouter.post("/", CreateS);
storeRouter.delete("/", DeleteS);
storeRouter.put("/", UpdateP);

export default storeRouter;
