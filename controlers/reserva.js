const ReservaModel = require("../modals/reserva")


const createReserva = async (req, res) => {
    try {
        const newReserva = new ReservaModel(req.body)
        await newReserva.save()
        res.status(201).json({msg: 'Reserva creada correctamente', newReserva})

        const body = req.body

        const reservaExiste = await ReservaModel.findOne({reserva : body.usuario})
        if (reservaExiste) {
           return  res.status(400).json({msg: "ya tenes una reserva"})}


    } catch (error) {
        console.log(error)
    }
}


module.exports = {
  createReserva
}