import mongoose from "mongoose"

async function ConectarBd() {
    try {
        await mongoose.connect(process.env.MONGO_URI)
        console.log("Base de datos conectada");
    } catch (error) {
        console.log(`Error al conectar ${error}`);
    }
}

ConectarBd()