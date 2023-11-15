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

fecha :{
    type: String,
    required: true
    
    },

horaReserva :{
    type: String,
    required: true
        
    }
}
)

const ReservaModel = mongoose.model("reserva", ReservaSChema) 

module.exports = ReservaModel