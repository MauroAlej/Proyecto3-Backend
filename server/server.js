const express = require("express")
const morgan = require("morgan")
const cors = require("cors")
class Server {

constructor(){
  this.app= express()
  this.port = process.env.PORT|| 2020
  
  
  this.middlewares()
  
  this.routes()
}

middlewares(){
  this.app.use(express.json()) /* para que funcione los req */
  this.app.use(cors()) 
}


routes(){
  this.app.use("/api/users", require("../routes/user"))
  this.app.use("/api/products", require("../routes/productHome"))
  this.app.use("/api/cart", require("../routes/carts"))
  this.app.use("/api/reserva", require("../routes/reserva"))
  this.app.use("/api/pay", require("../routes/pay"))
}
listen(){
    this.app.listen(this.port, ()=>{
        console.log("hola desde el servidor ",this.port)})
}
}

module.exports = Server



