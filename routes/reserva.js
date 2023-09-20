const {Router }= require('express')
const { createReserva } = require('../controlers/reserva')
const router = Router()

router.post('/', createReserva)


module.exports = router