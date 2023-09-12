const mongoose = require("mongoose")

try {
    mongoose.connect(process.env.MONGO_CONNECT)
.then(()=> console.log("base de datos Conectado"))

} catch (error) {
    throw new Error ("se podrujo un error",error)
}