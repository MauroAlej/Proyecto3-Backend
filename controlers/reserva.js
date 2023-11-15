const ReservaModel = require("../modals/reserva")


const createReserva = async (req, res) => {
    try {
        const { fecha, horaReserva } = req.body
        const searchFecha = await ReservaModel.find({ fecha })

        if (searchFecha.length > 0) {
            const filterFecha = searchFecha.filter((fechaRS) => fechaRS.horaReserva === horaReserva)
            if (filterFecha.length > 0) {
                res.status(400).json({ msg: `reserva no disponible. El turno estara disponible a las ${Number(hora) + 1}:${min}` })
            } else {
                const [horaRS, minRS] = searchFecha[0].horaReserva.split(':')
                if (hora === horaRS) {
                    res.status(400).json({ msg: `reserva no disponible. El turno estara disponible a las ${Number(horaRS) + 1}:${minRS}` })
                } else {
                    const newReserva = new ReservaModel(req.body)
                    await newReserva.save()
                    res.status(201).json({ msg: 'Reserva creada con exito' })
                }
            }

        } else {
            const newReserva = new ReservaModel(req.body)
            await newReserva.save()
            res.status(201).json({ msg: 'Reserva creada con exito' })
        }

    } catch (error) {
        console.log(error)
    }
}


module.exports = {
    createReserva
}