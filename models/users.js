const mongoose = require("mongoose")
const { token } = require("morgan")

const UserSChema = new mongoose.Schema({
nombre: String,
usuario: {
    type: String,
    unique : true,
    require: true
},

contrasenia: String,
token : {
type: String,
default: ""

},
role :{
type: String,
default : "user"

},

idCart:{
    type:String
}
}
)
UserSChema.methods.toJSON= function () {
 const { _v,contrasenia,...usuario}= this.toObject()  
 
 return usuario

}
const UserModel = mongoose.model("users", UserSChema) /* aqui creo la carpeta users */

module.exports = UserModel

