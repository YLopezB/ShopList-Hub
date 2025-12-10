import { Router } from "express";
import ReadP from "../controllers/products/read.js";
import CreateP from "../controllers/products/create.js";
import DeleteP from "../controllers/products/delete.js";
import UpdateP from "../controllers/products/update.js";

const productRouter = Router();

productRouter.get("/", ReadP);
productRouter.post("/", CreateP);
productRouter.delete("/", DeleteP);
productRouter.put("/", UpdateP);

export default productRouter;
