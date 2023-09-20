const mongoose = require("mongoose")

const ReservaSChema = new mongoose.Schema({
nombre: String,
usuario: {
    type: String,
    unique : true,
    required: true
},

invitados:{
    type: Number,
    required: true
},

motivo :{
type: String,
required: true

},

/* fechaYhora:{
    required:true
} */
}
)
ReservaSChema.methods.toJSON= function () {
 const { _v,...reserva}= this.toObject()  
 
 return reserva

}
const ReservaModel = mongoose.model("reserva", ReservaSChema) 

module.exports = ReservaModel