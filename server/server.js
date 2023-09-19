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
  this.app.use(express.json())
    this.app.use(morgan("dev"))
    this.app.use(express.static("public")) 
    this.app.use(cors())
}


routes(){
  this.app.use("/api/users", require("../routes/user"))
  
}
listen(){
    this.app.listen(this.port, ()=>{
        console.log("hola desde el servidor ",this.port)})
}
}

module.exports = Server



