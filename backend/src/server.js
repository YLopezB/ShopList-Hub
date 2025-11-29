import express from "express";
import "dotenv/config.js";
import "./config/dataBase.js";
import routerIndex from "./routers/index.js";

const server = express();
const PORT = process.env.PORT || 4040;
const ready = () => console.log(`Servidor corriendo en el puerto ${PORT}`);

server.use(express.json());
server.use("/api", routerIndex);

server.listen(PORT, ready);
